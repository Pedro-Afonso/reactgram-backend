import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'

// routes
import { router } from './src/routes/Router'

// database connection
// import { connectToDatabase } from './src/config/db'

const dbUri = process.env.DB_MONGO_URI
const port = process.env.PORT || '5000'
const app = express()

// Config JSON and form data response
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Solve Cors
const corsOptions = () => {
  if (process.env.NODE_ENV === 'PRODUCTION') {
    const whitelist = [
      process.env.ALLOWED_ORIGIN_1,
      process.env.ALLOWED_ORIGIN_2,
      process.env.ALLOWED_ORIGIN_3
    ]

    return {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    }
  } else {
    return {
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200
    }
  }
}

app.use(cors(corsOptions()))

// Upload directory
// app.use('/uploads', express.static(path.join(__dirname, '/src/uploads')))

// teste route
app.get('/', (req: Request, res: Response) => {
  res.send(`API is working!`)
})

app.use(router)

mongoose
  .connect(dbUri)
  // eslint-disable-next-line no-console
  .then(() => console.log('Database connection successful!'))
  // eslint-disable-next-line no-console
  .catch(err => console.log(err))

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('App is working!')
})

export { app }
