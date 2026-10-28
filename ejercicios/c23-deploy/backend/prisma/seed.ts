import { prisma } from "../src/config/prisma";
import bcrypt from "bcrypt";

const autores = [
  { nombre: "Leandro Paredes", nacionalidad: "Argentina" },
  { nombre: "Juan Román Riquelme", nacionalidad: "Argentina" },
  { nombre: "Martín Palermo", nacionalidad: "Argentina" },
  { nombre: "Lionel Messi", nacionalidad: "Argentina" },
  { nombre: "Diego Armando Maradona", nacionalidad: "Argentina" },
];

const categorias = [{ nombre: "Deportes" }, { nombre: "Biografía" }, { nombre: "Historia" }];

const libros = [
  { titulo: "Boca del MUNDO", autor: "Leandro Paredes", precio: 15500, imagen: "/8cW84tUUU_1200x0__1.jpg", disponible: true, cats: ["Deportes", "Historia"] },
  { titulo: "108", autor: "Juan Román Riquelme", precio: 25500, imagen: "/9789507544118.jpg", disponible: true, cats: ["Deportes", "Biografía"] },
  { titulo: "Boca Locura", autor: "Martín Palermo", precio: 14000, imagen: "/images (1).jpg", disponible: false, cats: ["Deportes", "Biografía"] },
  { titulo: "Messi", autor: "Lionel Messi", precio: 18000, imagen: "/images (2).jpg", disponible: true, cats: ["Deportes", "Biografía"] },
  { titulo: "Diego desde adentro", autor: "Diego Armando Maradona", precio: 19500, imagen: "/images.jpg", disponible: true, cats: ["Deportes", "Biografía"] },
  { titulo: "La pelota no se mancha", autor: "Lionel Messi", precio: 16000, imagen: "/La-pelota-no-se-mancha-Historia-del-futbol-argentino.jpg", disponible: false, cats: ["Deportes", "Historia"] },
];

const usuarios = [
  { email: "admin@libreria.test", nombre: "Admin", rol: "ADMIN" as const, password: "Admin1234" },
  { email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE" as const, password: "Cliente1234" },
];

async function main() {
  await prisma.autor.createMany({ data: autores, skipDuplicates: true });
  await prisma.categoria.createMany({ data: categorias, skipDuplicates: true });

  // Libros no tienen campo unique, para evitar duplicados en multiples ejecuciones, podemos limpiar antes o dejarlos.
  // Pero la consigna pide "que corra dos veces sin explotar".

  for (const { autor, cats, ...datos } of libros) {
    const existing = await prisma.libro.findFirst({ where: { titulo: datos.titulo } });
    if (!existing) {
      await prisma.libro.create({
        data: {
          ...datos,
          autor: { connect: { nombre: autor } },
          categorias: { connect: cats.map(nombre => ({ nombre })) },
        }
      });
    }
  }

  for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {},
      create: { ...datos, passwordHash: await bcrypt.hash(password, 10) },
    });
  }

  console.log("Seed completado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
