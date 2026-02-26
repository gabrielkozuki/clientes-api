import { ZodError } from "zod";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({ // retorna um array de objetos com os erros customizados
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          error: "Erro de validação de dados",
          details: formattedErrors,
        });
      }

      next(error); // outro erro, portanto delega ao próximo middleware
    }
  };
};