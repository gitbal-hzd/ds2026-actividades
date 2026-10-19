import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavigationBar } from './NavigationBar';
import { AuthContext } from '../../context/AuthContext';
import type { Usuario, Rol } from '../../types/sesionType';

function renderHeader(usuario: Usuario | null) {
  const auth = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <AuthContext.Provider value={auth}>
        <NavigationBar />
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

describe('NavigationBar', () => {
  it('sin sesión: muestra "Ingresar" y NO ve "+ Agregar Libro"', () => {
    renderHeader(null);

    expect(screen.getByText('Ingresar')).toBeInTheDocument();
    expect(screen.queryByText('+ Agregar Libro')).not.toBeInTheDocument();
  });

  it('CLIENTE: saluda por nombre y NO ve "+ Agregar Libro"', () => {
    renderHeader({ id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' });

    expect(screen.getByText('Hola, Cliente')).toBeInTheDocument();
    expect(screen.queryByText('+ Agregar Libro')).not.toBeInTheDocument();
  });

  it('ADMIN: saluda por nombre y ve el link "+ Agregar Libro"', () => {
    renderHeader({ id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' });

    expect(screen.getByText('Hola, Admin')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '+ Agregar Libro' })).toBeInTheDocument();
  });
});
