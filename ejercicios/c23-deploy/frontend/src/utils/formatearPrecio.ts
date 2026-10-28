export const formatearPrecio = (precio: number): string =>
  `$ ${new Intl.NumberFormat('es-AR').format(precio)}`;
