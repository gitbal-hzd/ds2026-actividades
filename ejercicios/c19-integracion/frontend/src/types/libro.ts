export type Autor = {
  id: number;
  nombre: string;
  nacionalidad: string;
};

export type Libro = {
  id: string | number;
  titulo: string;
  autor: Autor;
  precio: number;
  imagen: string;
  disponible?: boolean;
};

export type LibroCardProps = Libro;
