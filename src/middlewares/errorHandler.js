import { AppError } from '../errors/AppError.js';
import logger from '../logger.js';

export function errorHandler(err, req, res, next) {
  logger.error({ err }, 'Erro capturado pelo errorHandler');

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  // erro inesperado
  return res.status(500).json({ error: 'Erro interno do servidor.' });
}