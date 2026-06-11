import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { librosDestacados } from '../data/libros';

export function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const libro = librosDestacados.find(l => l.id === Number(id));

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
      <Card className="shadow-sm border-0 mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Img
          variant="top"
          src={libro.imagen}
          alt={`Portada de ${libro.titulo}`}
          style={{ height: '450px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title className="fw-bold fs-3">{libro.titulo}</Card.Title>
          <Card.Text className="text-muted">{libro.autor}</Card.Text>
          <Card.Text className="h4 text-primary fw-bold">
            ${libro.precio.toLocaleString('es-AR')}
          </Card.Text>
          <Button as={Link as any} to="/catalogo" variant="outline-secondary" className="mt-3">
            ← Volver al catálogo
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
