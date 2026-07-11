import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function NavigationBar() {
  return (
    <Navbar variant="dark" expand="lg" className="sticky-top glass-nav">
      <Container className="py-2">
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-gradient me-4">
          📚 Librería UTN
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-semibold gap-3 align-items-center">
            <Nav.Link as={Link} to="/" className="nav-hover">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo" className="nav-hover">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/libros/nuevo" className="btn-outline-premium px-3 py-2 ms-2 border" style={{ borderRadius: '20px' }}>
              + Agregar Libro
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
