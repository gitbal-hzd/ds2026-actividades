import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

const libros: Libro[] = [
  { id: 1, titulo: "Boca del MUNDO", autor: "Leandro Paredes", precio: 15500, imagen: "/8cW84tUUU_1200x0__1.jpg", disponible: true },
  { id: 2, titulo: "108", autor: "Juan Román Riquelme", precio: 25500, imagen: "/9789507544118.jpg", disponible: true },
  { id: 3, titulo: "Boca Locura", autor: "Martín Palermo", precio: 14000, imagen: "/images (1).jpg", disponible: false },
  { id: 4, titulo: "Messi", autor: "Lionel Messi", precio: 18000, imagen: "/images (2).jpg", disponible: true },
  { id: 5, titulo: "Diego desde adentro", autor: "Diego Armando Maradona", precio: 19500, imagen: "/images.jpg", disponible: true },
  { id: 6, titulo: "La pelota no se mancha", autor: "Lionel Messi", precio: 16000, imagen: "/La-pelota-no-se-mancha-Historia-del-futbol-argentino.jpg", disponible: false },
];

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería UTN" });
});

app.get("/libros", (_req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
