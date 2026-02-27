import { ZodError } from "zod";

const validate = (schema, req, res, next) => {
  try {
    schema.parse(req);
    
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map((issue) => ({ // retorna um array de objetos com os erros customizados
        field: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        error: "Erro de validação de dados",
        details: formattedErrors,
      });
    }

    next(error); // outro erro, portanto delega ao próximo middleware
  };
};

export const validateRequestBody = (schema) => {
  return (req, res, next) => validate(schema, req.body, res, next);
}

export const validateRequestParams = (schema) => {
  return (req, res, next) => validate(schema, req.query, res, next);
}

export const validateRequestRouteParams = (schema) => {
  return (req, res, next) => validate(schema, req.params, res, next);
}