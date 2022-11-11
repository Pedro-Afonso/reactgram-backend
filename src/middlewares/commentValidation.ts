import { body } from 'express-validator'

const commmentValidation = () => {
  return [
    body('comment')
      .trim()
      .not()
      .isEmpty()
      .withMessage('O comentário é obrigatório.')
      .not()
      .equals('undefined')
      .withMessage('O comentário é obrigatório.')
      .isString()
      .withMessage('O comentário é obrigatório.')
  ]
}

export { commmentValidation }
