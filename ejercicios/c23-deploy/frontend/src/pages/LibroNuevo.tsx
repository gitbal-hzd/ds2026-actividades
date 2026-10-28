import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import { apiFetch, ApiError } from '../services/api';

export function LibroNuevo() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: '',
    autorId: '',
    precio: '',
    imagen: '',
    disponible: true,
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorGlobal, setErrorGlobal] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorGlobal(null);

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

    try {
      const payload = {
        ...resultado.data,
        imagen: resultado.data.imagen?.trim() || '/images.jpg',
      };
      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      navigate('/catalogo');
    } catch (err) {
      if (err instanceof ApiError && err.status === 403) {
        setErrorGlobal('No tienes permiso para agregar libros.');
      } else {
        setErrorGlobal(err instanceof Error ? err.message : 'Error desconocido');
      }
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: 600 }}>
      <h2 className="text-center mb-4 fw-bold text-gradient">Agregar Nuevo Libro</h2>
      {errorGlobal && <Alert variant="danger">{errorGlobal}</Alert>}
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
          <Form.Label className="text-white">ID del Autor</Form.Label>
          <Form.Control
            type="number"
            name="autorId"
            value={form.autorId}
            onChange={handleChange}
            isInvalid={!!errores.autorId}
            className="bg-transparent text-white"
          />
          <Form.Control.Feedback type="invalid">
            {errores.autorId}
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

        <Form.Group className="mb-3">
          <Form.Label className="text-white">URL de la Imagen (opcional)</Form.Label>
          <Form.Control
            type="text"
            name="imagen"
            value={form.imagen}
            placeholder="/images.jpg"
            onChange={handleChange}
            className="bg-transparent text-white"
          />
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
