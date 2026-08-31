import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';

export function LibroNuevo() {
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

    // Aquí iría el POST a la API en el futuro
    navigate('/catalogo');
  };

  return (
    <Container className="py-5" style={{ maxWidth: 600 }}>
      <h2 className="text-center mb-4 fw-bold text-gradient">Agregar Nuevo Libro</h2>
      <Form onSubmit={handleSubmit} className="p-4 premium-card">
        
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Título</Form.Label>
          <Form.Control
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            isInvalid={!!errores.titulo}
            className="bg-transparent text-white"
          />
          <Form.Control.Feedback type="invalid">
            {errores.titulo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-white">Autor</Form.Label>
          <Form.Control
            name="autor"
            value={form.autor}
            onChange={handleChange}
            isInvalid={!!errores.autor}
            className="bg-transparent text-white"
          />
          <Form.Control.Feedback type="invalid">
            {errores.autor}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-white">Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            isInvalid={!!errores.precio}
            className="bg-transparent text-white"
          />
          <Form.Control.Feedback type="invalid">
            {errores.precio}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Check
          className="mb-4 text-white"
          type="checkbox"
          id="disponible"
          name="disponible"
          label="¿Está disponible para venta?"
          checked={form.disponible}
          onChange={handleChange}
        />

        <Button type="submit" className="btn-premium w-100 fw-bold">
          Guardar Libro
        </Button>
      </Form>
    </Container>
  );
}
