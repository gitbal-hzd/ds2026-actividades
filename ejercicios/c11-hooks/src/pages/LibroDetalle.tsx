import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

export function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

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

  const libro = (libros ?? []).find(l => l.id === Number(id));

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
          <Card.Title className="fw-bold fs-2 text-gradient mb-2">{libro.titulo}</Card.Title>
          <Card.Text className="text-muted mb-4 fs-5">{libro.autor}</Card.Text>
          <Card.Text className="h3 text-white fw-bold mb-4">
            ${libro.precio.toLocaleString('es-AR')}
          </Card.Text>
          <Button as={Link as any} to="/catalogo" className="btn-outline-premium w-100">
            ← Volver al catálogo
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
