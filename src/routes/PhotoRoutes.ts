import express from 'express'

// Controller
import {
  /*   commentPhoto, */
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getPhotoById,
  getUserPhotos,
  searchPhotos,
  likePhoto,
  updatePhoto
} from '../controllers/PhotoController'

// Middleware
import {
  photoInsertValidation,
  photoUpdateValidation
} from '../middlewares/photoValidation'
import { validate } from '../middlewares/handleValidations'
import { imageUploadS3 } from '../middlewares/imageUpload'
import { errorHandler } from '../middlewares/errorHandler'
import { authGuard } from '../middlewares/authGuard'

const router = express.Router()

// Routes
router.post(
  '/',
  authGuard,
  imageUploadS3('reactgram-network').single('image'),
  photoInsertValidation(),
  validate,
  insertPhoto
)
router.delete('/:id', authGuard, deletePhoto)
router.get('/', getAllPhotos)
router.get('/user/:id', getUserPhotos)
router.get('/search', searchPhotos)
router.get('/:id', getPhotoById)
router.put('/like/:id', authGuard, likePhoto)
router.put(
  '/:id',
  authGuard,
  imageUploadS3('reactgram-network').single('image'),
  photoUpdateValidation(),
  validate,
  updatePhoto
)

router.use(errorHandler)

export { router as PhotoRoutes }
