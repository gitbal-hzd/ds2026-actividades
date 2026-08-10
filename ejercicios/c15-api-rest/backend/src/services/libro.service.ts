import { Libro } from "../types/libro.types";

let libros: Libro[] = [
  { id: 1, titulo: "Boca del MUNDO", autor: "Leandro Paredes", precio: 15500, imagen: "/8cW84tUUU_1200x0__1.jpg", disponible: true },
  { id: 2, titulo: "108", autor: "Juan Román Riquelme", precio: 25500, imagen: "/9789507544118.jpg", disponible: true },
  { id: 3, titulo: "Boca Locura", autor: "Martín Palermo", precio: 14000, imagen: "/images (1).jpg", disponible: false },
  { id: 4, titulo: "Messi", autor: "Lionel Messi", precio: 18000, imagen: "/images (2).jpg", disponible: true },
  { id: 5, titulo: "Diego desde adentro", autor: "Diego Armando Maradona", precio: 19500, imagen: "/images.jpg", disponible: true },
  { id: 6, titulo: "La pelota no se mancha", autor: "Lionel Messi", precio: 16000, imagen: "/La-pelota-no-se-mancha-Historia-del-futbol-argentino.jpg", disponible: false },
];

let proximoId = 7;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) return libros;
  return libros.filter((l) => l.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find((l) => l.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Partial<Omit<Libro, "id">>): Libro | undefined {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return undefined;
  
  libros[index] = { ...libros[index], ...datos };
  return libros[index];
}

export function remove(id: number): boolean {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return false;

  libros.splice(index, 1);
  return true;
}
