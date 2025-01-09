import express, { Application, Request, Response } from "express";
const app: Application = express();
const PORT: number = 3000;

import * as dotenv from "dotenv";
dotenv.config();

import "./database/connection"; //db connection code

import userRoute from './routes/userRoute'
import adminSeeder from "./adminSeeder";


//admin seeder
adminSeeder()

app.get("/", (req: Request, res: Response) => {
  res.send("Project Started.");
});

app.use("", userRoute)

app.listen(PORT, () => {
  console.log("Server has started at port,", PORT);
});
