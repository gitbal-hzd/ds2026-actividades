import { obtenerToken } from './sesion';

export class ApiError extends Error {
  status: number;
  detalles?: any;
  constructor(status: number, message: string, detalles?: any) {
    super(message);
    this.status = status;
    this.detalles = detalles;
  }
}

const BASE = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const token = obtenerToken();
  const res = await fetch(`${BASE}${ruta}`, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers,
    },
  });

  if (res.status === 401 && token) {
    window.dispatchEvent(new Event('sesion-expirada'));
  }

  const cuerpo = await res.json().catch(() => null);
  if (!res.ok) {
    const errorMsg = cuerpo?.detalles?.length
      ? `${cuerpo.error}: ${cuerpo.detalles.map((d: any) => `${d.campo} (${d.mensaje})`).join(', ')}`
      : cuerpo?.error ?? `Error ${res.status}`;
    throw new ApiError(res.status, errorMsg, cuerpo?.detalles);
  }
  return cuerpo as T;
}
