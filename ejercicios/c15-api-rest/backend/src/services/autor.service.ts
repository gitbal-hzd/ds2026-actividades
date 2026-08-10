import { Autor } from "../types/autor.types";

let autores: Autor[] = [
  { id: 1, nombre: "Leandro Paredes", nacionalidad: "Argentina" },
  { id: 2, nombre: "Juan Román Riquelme", nacionalidad: "Argentina" },
  { id: 3, nombre: "Martín Palermo", nacionalidad: "Argentina" },
  { id: 4, nombre: "Lionel Messi", nacionalidad: "Argentina" },
  { id: 5, nombre: "Diego Armando Maradona", nacionalidad: "Argentina" },
];

let proximoId = 6;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find((a) => a.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevo: Autor = { id: proximoId++, ...datos };
  autores.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Partial<Omit<Autor, "id">>): Autor | undefined {
  const index = autores.findIndex((a) => a.id === id);
  if (index === -1) return undefined;
  
  autores[index] = { ...autores[index], ...datos };
  return autores[index];
}

export function remove(id: number): boolean {
  const index = autores.findIndex((a) => a.id === id);
  if (index === -1) return false;

  autores.splice(index, 1);
  return true;
}
