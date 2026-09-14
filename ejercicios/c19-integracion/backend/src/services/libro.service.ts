import { Prisma, Libro } from "@prisma/client";
import { prisma } from "../config/prisma";

export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;

export type LibroDetalle = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true }
}>;

export async function findAll(disponible?: boolean): Promise<LibroConAutor[]> {
  if (disponible === undefined) {
    return prisma.libro.findMany({ include: { autor: true } });
  }
  return prisma.libro.findMany({ where: { disponible }, include: { autor: true } });
}

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true, categorias: true }
  });
}

export async function create(datos: any): Promise<Libro> {
  return prisma.libro.create({ data: datos });
}

export async function update(id: number, datos: any): Promise<Libro | null> {
  // P2025 handled by prisma and our errorHandler so we don't need manual checking
  return prisma.libro.update({
    where: { id },
    data: datos,
  });
}

export async function remove(id: number): Promise<boolean> {
  // P2025 handled by prisma and our errorHandler
  await prisma.libro.delete({ where: { id } });
  return true;
}
