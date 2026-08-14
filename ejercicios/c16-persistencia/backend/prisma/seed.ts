import { prisma } from "../src/config/prisma";

const libros = [
  { titulo: "Boca del MUNDO", autor: "Leandro Paredes", precio: 15500, imagen: "/8cW84tUUU_1200x0__1.jpg", disponible: true },
  { titulo: "108", autor: "Juan Román Riquelme", precio: 25500, imagen: "/9789507544118.jpg", disponible: true },
  { titulo: "Boca Locura", autor: "Martín Palermo", precio: 14000, imagen: "/images (1).jpg", disponible: false },
  { titulo: "Messi", autor: "Lionel Messi", precio: 18000, imagen: "/images (2).jpg", disponible: true },
  { titulo: "Diego desde adentro", autor: "Diego Armando Maradona", precio: 19500, imagen: "/images.jpg", disponible: true },
  { titulo: "La pelota no se mancha", autor: "Lionel Messi", precio: 16000, imagen: "/La-pelota-no-se-mancha-Historia-del-futbol-argentino.jpg", disponible: false },
];

const autores = [
  { nombre: "Leandro Paredes", nacionalidad: "Argentina" },
  { nombre: "Juan Román Riquelme", nacionalidad: "Argentina" },
  { nombre: "Martín Palermo", nacionalidad: "Argentina" },
  { nombre: "Lionel Messi", nacionalidad: "Argentina" },
  { nombre: "Diego Armando Maradona", nacionalidad: "Argentina" },
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
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
