import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateUserCreation = [
  body("name")
    .notEmpty()
    .withMessage("Nome é obrigatório")
    .isString()
    .withMessage("Nome deve ser uma string")
    .custom((value) => {
      if (/\d/.test(value)) {
        throw new Error("Nome não pode conter números");
      }
      return true;
    })
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("Email é obrigatório")
    .isEmail()
    .withMessage("Email inválido")
    .normalizeEmail(),

  body("cep")
    .notEmpty()
    .withMessage("CEP é obrigatório")
    .matches(/^\d{8}$/)
    .withMessage("CEP deve conter exatamente 8 números")
    .custom((value) => {
      if (!/^\d+$/.test(value)) {
        throw new Error("CEP deve conter apenas números");
      }
      return true;
    }),

  // Middleware
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((error) => ({
          field: error.type,
          message: error.msg,
        })),
      });
    }

    next();
  },
];
