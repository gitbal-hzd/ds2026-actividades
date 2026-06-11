import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LibroCard } from '../components/LibroCard';
import { librosDestacados } from '../data/libros';

export function Home() {
  return (
    <>
      <header className="bg-primary text-white text-center py-5 mb-5 shadow-sm">
        <Container>
          <h1 className="display-4 fw-bold">Bienvenidos a nuestra Librería</h1>
          <p className="lead">Descubrí las mejores historias y autores de fútbol.</p>
          <Button as={Link as any} to="/catalogo" variant="light" size="lg" className="fw-bold text-primary">
            Ver Catálogo Completo
          </Button>
        </Container>
      </header>

      <Container className="flex-grow-1">
        <h2 className="text-center mb-4 fw-bold text-secondary">Libros Destacados</h2>
        <Row className="g-4">
          {librosDestacados.map(libro => (
            <LibroCard key={libro.id} {...libro} />
          ))}
        </Row>
      </Container>
    </>
  );
}