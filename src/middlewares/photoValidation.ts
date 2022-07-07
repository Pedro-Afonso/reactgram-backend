import { body } from "express-validator";

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório.")
      .isString()
      .withMessage("O título é obrigarório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("image").custom((_, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória.");
      }

      return true;
    }),
  ];
};

export { photoInsertValidation };
