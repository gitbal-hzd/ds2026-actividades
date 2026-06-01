import { Container, Row } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';
import { librosDestacados } from '../data/libros';

export function Catalogo() {
  return (
    <Container className="flex-grow-1 py-4">
      <h2 className="text-center mb-4 fw-bold text-secondary">Catálogo Completo</h2>
      <Row className="g-4">
        {librosDestacados.map(libro => (
          <LibroCard key={libro.id} {...libro} />
        ))}
      </Row>
    </Container>
  );
}
