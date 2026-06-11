import { Container, Row } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';
import type { Libro } from '../types/libro';

type CatalogoProps = {
  libros: Libro[];
};

export function Catalogo({ libros }: CatalogoProps) {
  return (
    <Container className="flex-grow-1 py-4">
      <h2 className="text-center mb-4 fw-bold text-secondary">Catálogo Completo</h2>
      <Row className="g-4">
        {libros.map(libro => (
          <LibroCard key={libro.id} {...libro} />
        ))}
      </Row>
    </Container>
  );
}
