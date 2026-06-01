import { Container, Row, Button } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';

export function Home() {
  const librosDestacados = [
    { id: 1, titulo: "Boca del MUNDO", autor: "Leandro Paredes", precio: 15500, imagen: "/8cW84tUUU_1200x0__1.jpg" },
    { id: 2, titulo: "108", autor: "Juan Román Riquelme", precio: 25500, imagen: "/9789507544118.jpg" },
    { id: 3, titulo: "Boca Locura", autor: "Martín Palermo", precio: 14000, imagen: "/images (1).jpg" },
    { id: 4, titulo: "Messi", autor: "Lionel Messi", precio: 18000, imagen: "/images (2).jpg" },
    { id: 5, titulo: "Diego desde adentro", autor: "Diego Armando Maradona", precio: 19500, imagen: "/images.jpg" },
    { id: 6, titulo: "La pelota no se mancha", autor: "Lionel Messi", precio: 16000, imagen: "/La-pelota-no-se-mancha-Historia-del-futbol-argentino.jpg" }
  ];

  return (
    <>
      <header className="bg-primary text-white text-center py-5 mb-5 shadow-sm">
        <Container>
          <h1 className="display-4 fw-bold">Bienvenidos a nuestra Librería</h1>
          <p className="lead">Descubrí las mejores historias y autores de fútbol.</p>
          <Button variant="light" size="lg" className="fw-bold text-primary">Ver Catálogo Completo</Button>
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