import { z } from 'zod';

export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio'),
  autorId: z.coerce.number().positive('El autor es obligatorio y debe ser válido'),
  precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
  disponible: z.boolean(),
  imagen: z.string().optional(),
});

export type LibroValidado = z.infer<typeof libroSchema>;
