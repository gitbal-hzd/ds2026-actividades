import { Navbar, Nav, Container } from 'react-bootstrap';

export function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
      <Container>
        <Navbar.Brand href="#home">📚 Librería UTN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#inicio" active>Inicio</Nav.Link>
            <Nav.Link href="#catalogo">Catálogo</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
