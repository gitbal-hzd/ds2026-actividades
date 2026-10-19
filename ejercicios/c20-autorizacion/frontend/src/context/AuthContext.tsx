import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { obtenerToken, guardarToken, borrarToken } from '../services/sesion';
import type { Usuario, Rol, Credenciales, Sesion } from '../types/sesionType';

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(obtenerToken() !== null);

  const logout = () => {
    borrarToken();
    setUsuario(null);
  };

  useEffect(() => {
    if (!obtenerToken()) {
      setCargando(false);
      return;
    }

    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => logout())
      .finally(() => setCargando(false));
  }, []);

  // Agregar el listener para sesion-expirada de la filmina 34
  useEffect(() => {
    const handleSesionExpirada = () => logout();
    window.addEventListener('sesion-expirada', handleSesionExpirada);
    return () => window.removeEventListener('sesion-expirada', handleSesionExpirada);
  }, []);

  const login = async (credenciales: Credenciales) => {
    const sesion = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });
    guardarToken(sesion.token);
    setUsuario(sesion.usuario);
  };

  const estaAutenticado = usuario !== null;
  const tieneRol = (rol: Rol) => usuario?.rol === rol;

  return (
    <AuthContext.Provider value={{ usuario, cargando, estaAutenticado, tieneRol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return context;
}
