import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import type { Libro } from '../types/libro';

type LibroNuevoProps = {
  onAgregar: (libro: Libro) => void;
};

export function LibroNuevo({ onAgregar }: LibroNuevoProps) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    precio: '',
    disponible: true,
  });

  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resultado = libroSchema.safeParse(form);

    if (!resultado.success) {
      const nuevosErrores: Record<string, string> = {};
      for (const issue of resultado.error.issues) {
        const campo = String(issue.path[0]);
        if (!nuevosErrores[campo]) nuevosErrores[campo] = issue.message;
      }
      setErrores(nuevosErrores);
      return;
    }

    const nuevoLibro: Libro = {
      ...resultado.data,
      id: Date.now().toString(),
      imagen: 'https://placehold.co/300x400?text=Nuevo+Libro',
    };

    onAgregar(nuevoLibro);
    navigate('/catalogo');
  };

  return (
    <Container className="py-5" style={{ maxWidth: 600 }}>
      <h2 className="text-center mb-4 fw-bold text-secondary">Agregar Nuevo Libro</h2>
      <Form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-white">
        
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            isInvalid={!!errores.titulo} // Si hay error, Bootstrap lo pinta de rojo
          />
          <Form.Control.Feedback type="invalid">
            {errores.titulo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            name="autor"
            value={form.autor}
            onChange={handleChange}
            isInvalid={!!errores.autor}
          />
          <Form.Control.Feedback type="invalid">
            {errores.autor}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            isInvalid={!!errores.precio}
          />
          <Form.Control.Feedback type="invalid">
            {errores.precio}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Check
          className="mb-4"
          type="checkbox"
          id="disponible"
          name="disponible"
          label="¿Está disponible para venta?"
          checked={form.disponible}
          onChange={handleChange}
        />

        <Button variant="primary" type="submit" className="w-100 fw-bold">
          Guardar Libro
        </Button>
      </Form>
    </Container>
  );
}
