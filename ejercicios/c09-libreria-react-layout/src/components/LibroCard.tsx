import { useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { LibroCardProps } from '../types/libro';

export function LibroCard({ id, titulo, autor, precio, imagen }: LibroCardProps) {
  const [likes, setLikes] = useState<number>(0);

  return (
    <Col xs={12} md={6} lg={4}>
      <Card className="h-100 shadow-sm border-0">
        <Card.Img variant="top" src={imagen} alt={`Portada de ${titulo}`} style={{ height: '350px', objectFit: 'cover' }} />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate fw-bold">{titulo}</Card.Title>
          <Card.Text className="text-muted small mb-3">{autor}</Card.Text>
          <Card.Text className="h5 text-primary fw-bold mt-auto">
            ${precio.toLocaleString('es-AR')}
          </Card.Text>
          
          <div className="d-flex gap-2 mt-3">
            <Button as={Link as any} to={`/libros/${id}`} variant="outline-primary" className="w-50">
              Ver más
            </Button>
            
            <Button variant="outline-danger" className="w-50" onClick={() => setLikes(likes + 1)}>
              ❤️ {likes}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}