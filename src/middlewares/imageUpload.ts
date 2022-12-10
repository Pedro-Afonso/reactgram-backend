import { S3Client } from '@aws-sdk/client-s3'
import multerS3 from 'multer-s3'
import multer from 'multer'
import path from 'path'

// Destination to store image

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
})

const imageUploadS3 = (bucket: string) =>
  multer({
    storage: multerS3({
      s3,
      bucket,
      metadata: function (_, file, cb) {
        cb(null, { fieldName: file.fieldname })
      },

      key: function (_, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
      }
    }),
    fileFilter(_, file, cb) {
      // upload only png and jpg format
      if (!file.originalname.match(/\.(png|jpg)$/)) {
        return cb(
          new Error('Por favor, envie apenas fotos no formato png ou jpg!')
        )
      }

      cb(null, true)
    },
    limits: { fileSize: 5000000 }
  })

export { imageUploadS3 }
