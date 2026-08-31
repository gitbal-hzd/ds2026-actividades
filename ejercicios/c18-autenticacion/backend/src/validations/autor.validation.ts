import { z } from "zod";

export const autorCreateSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(150),
  nacionalidad: z.string().trim().min(1, "La nacionalidad es obligatoria").max(100),
});

export const autorUpdateSchema = autorCreateSchema.partial();
