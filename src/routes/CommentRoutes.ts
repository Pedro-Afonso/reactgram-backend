import express from 'express'

// Controller
import {
  insertComment,
  deleteComment,
  getCommentsByPhotoId
} from '../controllers/CommentController'

// Middleware
import { commmentValidation } from '../middlewares/commentValidation'
import { validate } from '../middlewares/handleValidations'
import { errorHandler } from '../middlewares/errorHandler'
import { authGuard } from '../middlewares/authGuard'

const router = express.Router()

// Routes
router.get('/:id', getCommentsByPhotoId)
router.post('/', authGuard, commmentValidation(), validate, insertComment)
router.delete('/:id', authGuard, deleteComment)

router.use(errorHandler)

export { router as CommentRoutes }
