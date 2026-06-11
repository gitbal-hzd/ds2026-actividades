import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { LibroDetalle } from './pages/LibroDetalle';
import { LibroNuevo } from './pages/LibroNuevo';
import { librosDestacados } from './data/libros';
import type { Libro } from './types/libro';

export default function App() {
  const [libros, setLibros] = useState<Libro[]>(librosDestacados);

  const agregarLibro = (nuevo: Libro) => {
    setLibros([...libros, nuevo]);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
      </Routes>
    </Layout>
  );
}