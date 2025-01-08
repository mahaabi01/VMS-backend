import express, { Application, Request, Response } from "express";
const app: Application = express();
const PORT: number = 3000;

import * as dotenv from "dotenv";
dotenv.config();

require("./database/connection"); //db connection code

app.get("/", (req: Request, res: Response) => {
  res.send("Project Started.");
});

app.listen(PORT, () => {
  console.log("Server has started at port,", PORT);
});
