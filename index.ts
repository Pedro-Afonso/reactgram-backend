import express, { Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
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
const allowedOrigins = [
  process.env.ALLOWED_ORIGIN_1,
  process.env.ALLOWED_ORIGIN_2,
  process.env.ALLOWED_ORIGIN_3
]
const corsOptions: CorsOptions = {
  credentials: true,
  origin: ['https://reactgram-frontend.vercel.app', 'http://localhost:3000']
}
app.use(cors())

// Upload directory
// app.use('/uploads', express.static(path.join(__dirname, '/src/uploads')))

// teste route
app.get('/', (req: Request, res: Response) => {
  res.send(`API is working!${allowedOrigins}`)
})

app.use(router)

mongoose.connect(dbUri, function (err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  } else {
    // eslint-disable-next-line no-console
    console.log('Database connection successful!')
  }
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('App is working!')
})

export { app }
