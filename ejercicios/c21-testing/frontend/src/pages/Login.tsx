import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { loginSchema } from '../schemas/loginSchema';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorGlobal, setErrorGlobal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorGlobal(null);

    const resultado = loginSchema.safeParse(form);

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
      setLoading(true);
      await login(resultado.data);
      navigate(location.state?.desde ?? '/catalogo', { replace: true });
    } catch (err) {
      setErrorGlobal(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: 400 }}>
      <h2 className="text-center mb-4 fw-bold text-gradient">Iniciar Sesión</h2>
      {errorGlobal && <Alert variant="danger">{errorGlobal}</Alert>}
      <Form onSubmit={handleSubmit} className="p-4 premium-card">
        
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            isInvalid={!!errores.email}
            className="bg-transparent text-white"
          />
          <Form.Control.Feedback type="invalid">
            {errores.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="text-white">Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            isInvalid={!!errores.password}
            className="bg-transparent text-white"
          />
          <Form.Control.Feedback type="invalid">
            {errores.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="btn-premium w-100 fw-bold" disabled={loading}>
          {loading ? 'Ingresando...' : 'Entrar'}
        </Button>
      </Form>
    </Container>
  );
}
