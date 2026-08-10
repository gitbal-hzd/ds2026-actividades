import { Container } from 'react-bootstrap';

export function MainFooter() {
  return (
    <footer className="glass-panel text-muted text-center py-5 mt-5 border-0 border-top">
      <Container>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <span className="fs-5 fw-bold text-gradient mb-2">📚 Librería UTN</span>
          <p className="mb-0 small" style={{ letterSpacing: '0.5px' }}>
            © 2026 Desarrollo de Software. C11 Actividad Individual.
          </p>
        </div>
      </Container>
    </footer>
  );
}
