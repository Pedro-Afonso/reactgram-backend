import express, { Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
// import path from 'path'

// routes
import { router } from './src/routes/Router'

// database connection
import { conn } from './src/config/db'

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

// conn()
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('App is working!')
})

export { app }
