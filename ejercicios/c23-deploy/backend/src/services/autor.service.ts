import { Prisma, Autor } from "@prisma/client";
import { prisma } from "../config/prisma";

export type AutorConLibros = Prisma.AutorGetPayload<{ include: { libros: true } }>;

export async function findAll(): Promise<Autor[]> {
  return prisma.autor.findMany();
}

export async function findById(id: number): Promise<AutorConLibros | null> {
  return prisma.autor.findUnique({
    where: { id },
    include: { libros: true }
  });
}

export async function create(datos: any): Promise<Autor> {
  return prisma.autor.create({ data: datos });
}

export async function update(id: number, datos: any): Promise<Autor | null> {
  return prisma.autor.update({
    where: { id },
    data: datos,
  });
}

export async function remove(id: number): Promise<boolean> {
  await prisma.autor.delete({ where: { id } });
  return true;
}
