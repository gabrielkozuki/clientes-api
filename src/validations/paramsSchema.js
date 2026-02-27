import { z } from "zod";
import mongoose from "mongoose";

export const paginationSchema = z.object({
  page: z.coerce.number({ error: "A página deve ser um número inteiro." })
    .int({ error: "A página deve ser um número inteiro." })
    .min(1, { error: "A página deve ser maior ou igual a 1." })
    .default(1),
  limit: z.coerce.number({ error: "O limite deve ser um número inteiro." })
    .int({ error: "O limite deve ser um número inteiro." })
    .min(1, { error: "O limite deve ser maior ou igual a 1." })
    .max(100, { error: "O limite deve ser menor ou igual a 100." })
    .default(10),
});

export const documentIdParamsSchema = z.object({
  id: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: "Id inválido.",
  }),
});