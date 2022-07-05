import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";

// routes
import { router } from "./src/routes/Router";

// database connection
import "./src/config/db";

const port = process.env.PORT;
const app = express();

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve Cors
const allowedOrigins = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
};
app.use(cors(corsOptions));

// teste route
app.get("/", (req: Request, res: Response) => {
  res.send("API is working!");
});

app.use(router);

app.listen(port, () => {
  console.log("App is working!");
});
