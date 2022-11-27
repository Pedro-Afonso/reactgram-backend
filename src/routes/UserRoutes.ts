import express from 'express'

// Controllers
import {
  register,
  login,
  getCurrentUser,
  update,
  getUserById
} from '../controllers/UserController'

// Middlewares
import {
  loginValidation,
  userCreateValidation,
  userUpdateValidation
} from '../middlewares/userValidations'
import { validate } from '../middlewares/handleValidations'
import { imageUploadS3 } from '../middlewares/imageUpload'
import { errorHandler } from '../middlewares/errorHandler'
import { authGuard } from '../middlewares/authGuard'

const router = express()

router.post('/register', userCreateValidation(), validate, register)
router.get('/profile', authGuard, getCurrentUser)
router.post('/login', loginValidation(), validate, login)
router.put(
  '/',
  authGuard,
  imageUploadS3('reactgram-network').single('profileImage'),
  userUpdateValidation(),
  validate,
  update
)
router.get('/:id', getUserById)

router.use(errorHandler)

export { router as UserRoutes }
