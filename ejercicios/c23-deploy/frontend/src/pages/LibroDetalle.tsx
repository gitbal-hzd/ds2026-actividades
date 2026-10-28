import { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';
import { AuthContext } from '../context/AuthContext';
import { apiFetch } from '../services/api';

export function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: libro, loading, error } = useFetch<Libro>(`/libros/${id}`);
  const [eliminando, setEliminando] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const esAdmin = auth?.tieneRol('ADMIN') ?? false;

  const handleEliminar = async () => {
    if (!libro || !window.confirm(`¿Seguro que querés eliminar "${libro.titulo}"?`)) return;
    try {
      setEliminando(true);
      setErrorEliminar(null);
      await apiFetch(`/libros/${id}`, { method: 'DELETE' });
      navigate('/catalogo');
    } catch (err) {
      setErrorEliminar(err instanceof Error ? err.message : 'No se pudo eliminar el libro');
    } finally {
      setEliminando(false);
    }
  };

  if (loading) {
    return (
      <Container className="flex-grow-1 py-5 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="flex-grow-1 py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!libro) {
    return (
      <Container className="flex-grow-1 py-5 text-center">
        <h2>Libro no encontrado</h2>
        <Link to="/">Volver al inicio</Link>
      </Container>
    );
  }

  return (
    <Container className="flex-grow-1 py-5">
      <Card className="shadow-sm border-0 mx-auto premium-card" style={{ maxWidth: '600px' }}>
        <Card.Img
          variant="top"
          src={libro.imagen}
          alt={`Portada de ${libro.titulo}`}
          style={{ height: '450px', objectFit: 'cover' }}
        />
        <Card.Body className="p-4">
          {errorEliminar && <Alert variant="danger">{errorEliminar}</Alert>}
          <Card.Title className="fw-bold fs-2 text-gradient mb-2">{libro.titulo}</Card.Title>
          <Card.Text className="text-muted mb-4 fs-5">{libro.autor.nombre}</Card.Text>
          <Card.Text className="h3 text-white fw-bold mb-4">
            ${libro.precio.toLocaleString('es-AR')}
          </Card.Text>
          {esAdmin && (
            <Button
              variant="danger"
              className="w-100 mb-3 fw-bold"
              onClick={handleEliminar}
              disabled={eliminando}
            >
              {eliminando ? 'Eliminando...' : '🗑️ Eliminar libro'}
            </Button>
          )}
          <Button as={Link as any} to="/catalogo" className="btn-outline-premium w-100">
            ← Volver al catálogo
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
