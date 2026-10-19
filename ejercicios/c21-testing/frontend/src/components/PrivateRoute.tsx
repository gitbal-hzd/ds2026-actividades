import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import type { Rol } from '../types/sesionType';

export function PrivateRoute({ rol }: { rol?: Rol }) {
  const { usuario, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return (
      <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }

  if (rol && usuario.rol !== rol) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return <Outlet />;
}
