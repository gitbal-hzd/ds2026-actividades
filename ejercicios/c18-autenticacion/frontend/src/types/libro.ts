export type Libro = {
  id: string | number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible?: boolean;
};

export type LibroCardProps = Libro;
