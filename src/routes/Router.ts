import express from 'express'
import { UserRoutes } from './UserRoutes'
import { PhotoRoutes } from './PhotoRoutes'
import { CommentRoutes } from './CommentRoutes'

const router = express()

router.use('/api/users', UserRoutes)
router.use('/api/photos', PhotoRoutes)
router.use('/api/comments', CommentRoutes)

export { router }
