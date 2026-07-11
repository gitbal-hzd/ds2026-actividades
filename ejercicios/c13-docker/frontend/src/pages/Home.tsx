import { Container, Row, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LibroCard } from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

export function Home() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

  return (
    <>
      <header className="hero-section text-center py-5 mb-5">
        <Container className="hero-content py-5">
          <h1 className="display-4 fw-bold text-gradient mb-3">Bienvenidos a nuestra Librería</h1>
          <p className="lead text-muted mb-4">Descubrí las mejores historias y autores de fútbol.</p>
          <Button as={Link as any} to="/catalogo" className="btn-premium btn-lg mt-3">
            Explorar Catálogo Premium
          </Button>
        </Container>
      </header>

      <Container className="flex-grow-1">
        <h2 className="text-center mb-4 fw-bold text-secondary">Libros Destacados</h2>
        
        {loading && (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {error && (
          <Alert variant="danger">{error}</Alert>
        )}

        {!loading && !error && (
          <Row className="g-4">
            {(libros ?? []).slice(0, 3).map(libro => (
              <LibroCard key={libro.id} {...libro} />
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}