import { Container, Row, Spinner, Alert } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

export function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

  if (loading) {
    return (
      <Container className="flex-grow-1 py-4 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="flex-grow-1 py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="flex-grow-1 py-4">
      <h2 className="text-center mb-5 display-5 fw-bold text-gradient">Catálogo Completo</h2>
      <Row className="g-4">
        {(libros ?? []).map(libro => (
          <LibroCard key={libro.id} {...libro} />
        ))}
      </Row>
    </Container>
  );
}
