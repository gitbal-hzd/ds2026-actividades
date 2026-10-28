import { Container, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function SinPermiso() {
  return (
    <Container className="py-5 text-center" style={{ maxWidth: 500 }}>
      <Alert variant="warning" className="p-4 shadow-sm">
        <h3 className="alert-heading fw-bold mb-3">Acceso Denegado</h3>
        <p>No tenés permiso para ver esta página o realizar esta operación.</p>
        <hr />
        <Button as={Link as any} to="/catalogo" variant="warning" className="fw-bold w-100 mt-2">
          Volver al catálogo
        </Button>
      </Alert>
    </Container>
  );
}
