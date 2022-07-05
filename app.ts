import express, { Request, Response } from "express";
// database connection
import "./src/config/db";

const app = express();

const port = process.env.PORT;

// teste route
app.get("/", (req: Request, res: Response) => {
  res.send("API is working!");
});

app.listen(port, () => {
  console.log("App is working!");
});
