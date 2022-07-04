import express, { Request, Response } from "express";

const app = express();

// teste route
app.get("/", (req: Request, res: Response) => {
  res.send("API is working!");
});

app.listen(5000, () => {
  console.log("App is working!");
});
