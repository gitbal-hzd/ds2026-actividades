import { useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap';


// 1. TIPADO DE LAS PROPS 

type LibroCardProps = {
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
};


// CARD DE LIBRO 

function LibroCard({ titulo, autor, precio, imagen }: LibroCardProps) {

  const [likes, setLikes] = useState<number>(0);

  return (
    <Col xs={12} md={6} lg={4}>
      <Card className="h-100 shadow-sm border-0">
        <Card.Img 
          variant="top" 
          src={imagen} 
          alt={`Portada de ${titulo}`} 
          style={{ height: '350px', objectFit: 'cover' }} 
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate fw-bold">{titulo}</Card.Title>
          <Card.Text className="text-muted small mb-3">{autor}</Card.Text>
          <Card.Text className="h5 text-primary fw-bold mt-auto">
            ${precio.toLocaleString('es-AR')}
          </Card.Text>
          
          <div className="d-flex gap-2 mt-3">
            <Button variant="outline-primary" className="w-50">Ver más</Button>
            
            {}
            <Button 
              variant="outline-danger" 
              className="w-50" 
              onClick={() => setLikes(likes + 1)}
            >
              ❤️ {likes}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}


// NAVBAR 

function NavigationBar() {
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


//  FOOTER 

function MainFooter() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <Container>
        <p className="mb-0 small">© 2026 Librería UTN - Desarrollo de Software. C08 Actividad Individual.</p>
      </Container>
    </footer>
  );
}


// 5. COMPONENTE PRINCIPAL 

function App() {
  const librosDestacados = [
    { id: 1, titulo: "Boca del MUNDO", autor: "Leandro Paredes", precio: 15500, imagen: "/8cW84tUUU_1200x0__1.jpg" },
    { id: 2, titulo: "108", autor: "Juan Román Riquelme", precio: 25500, imagen: "/9789507544118.jpg" },
    { id: 3, titulo: "Boca Locura", autor: "Martín Palermo", precio: 14000, imagen: "/images (1).jpg" },
    { id: 4, titulo: "Messi", autor: "Lionel Messi", precio: 18000, imagen: "/images (2).jpg" },
    { id: 5, titulo: "Diego desde adentro", autor: "Diego Armando Maradona", precio: 19500, imagen: "/images.jpg" },
    { id: 6, titulo: "La pelota no se mancha", autor: "Lionel Messi", precio: 16000, imagen: "/La-pelota-no-se-mancha-Historia-del-futbol-argentino.jpg" }
  ];

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <NavigationBar />

      {}
      <header className="bg-primary text-white text-center py-5 mb-5 shadow-sm">
        <Container>
          <h1 className="display-4 fw-bold">Bienvenidos a nuestra Librería</h1>
          <p className="lead">Descubrí las mejores historias y autores de fútbol.</p>
          <Button variant="light" size="lg" className="fw-bold text-primary">Ver Catálogo Completo</Button>
        </Container>
      </header>

      {}
      <Container className="flex-grow-1">
        <h2 className="text-center mb-4 fw-bold text-secondary">Libros Destacados</h2>
        
        <Row className="g-4">
          {librosDestacados.map(libro => (
            <LibroCard 
              key={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              precio={libro.precio}
              imagen={libro.imagen}
            />
          ))}
        </Row>
      </Container>

      <MainFooter />
    </div>
  );
}

export default App;