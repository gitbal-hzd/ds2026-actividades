/*
  Warnings:

  - You are about to drop the column `autor` on the `Libro` table. All the data in the column will be lost.
  - You are about to alter the column `precio` on the `Libro` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - A unique constraint covering the columns `[nombre]` on the table `Autor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `autorId` to the `Libro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Libro" DROP COLUMN "autor",
ADD COLUMN     "autorId" INTEGER NOT NULL,
ALTER COLUMN "precio" SET DATA TYPE INTEGER,
ALTER COLUMN "disponible" SET DEFAULT true;

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriaToLibro" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Autor_nombre_key" ON "Autor"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriaToLibro_AB_unique" ON "_CategoriaToLibro"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriaToLibro_B_index" ON "_CategoriaToLibro"("B");

-- AddForeignKey
ALTER TABLE "Libro" ADD CONSTRAINT "Libro_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToLibro" ADD CONSTRAINT "_CategoriaToLibro_A_fkey" FOREIGN KEY ("A") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToLibro" ADD CONSTRAINT "_CategoriaToLibro_B_fkey" FOREIGN KEY ("B") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
