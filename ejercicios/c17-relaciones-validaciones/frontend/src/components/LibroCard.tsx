import { useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { LibroCardProps } from '../types/libro';

export function LibroCard({ id, titulo, autor, precio, imagen }: LibroCardProps) {
  const [likes, setLikes] = useState<number>(0);

  return (
    <Col xs={12} md={6} lg={4}>
      <Card className="h-100 border-0 premium-card">
        <div style={{ overflow: 'hidden' }}>
          <Card.Img variant="top" src={imagen} alt={`Portada de ${titulo}`} style={{ height: '350px', objectFit: 'cover' }} />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate fw-bold">{titulo}</Card.Title>
          <Card.Text className="text-muted small mb-3">{autor}</Card.Text>
          <Card.Text className="h5 text-gradient fw-bold mt-auto">
            ${precio.toLocaleString('es-AR')}
          </Card.Text>
          
          <div className="d-flex gap-2 mt-3">
            <Button as={Link as any} to={`/libros/${id}`} className="btn-premium w-50">
              Ver más
            </Button>
            
            <Button className="btn-outline-premium w-50" onClick={() => setLikes(likes + 1)}>
              ❤️ {likes}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}