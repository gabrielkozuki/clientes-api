import { z } from "zod";

export const zodClientSchema = z.object({
  name: z.string({
    error: (issue) => issue.input === undefined ? "O nome é obrigatório." : "O nome deve ser uma string.",
  }).min(2, { error: "O nome deve conter pelo menos 2 caracteres." }),
  email: z.email({
    error: (issue) => issue.input === undefined ? "O e-mail é obrigatório." : "Formato de e-mail inválido.",
  }),
  document: z.string({
    error: (issue) => issue.input === undefined ? "O documento é obrigatório." : "O documento deve ser uma string.",
  }).min(11, { error: "O documento deve ter no mínimo 11 caracteres." })
    .max(14, { error: "O documento deve ter no máximo 14 caracteres." })
    .regex(/^\d+$/, { error: "O documento deve conter apenas números (sem pontuação)." }),
});

export const zodPartialClientSchema = zodClientSchema.partial(); // schema para PATCH