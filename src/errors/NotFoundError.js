import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
  constructor() {
    super('Conteúdo não encontrado', 404);
  }
}