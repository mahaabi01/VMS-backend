import express, { Application, Request, Response } from "express";
const app: Application = express();
const PORT: number = 3000;

import * as dotenv from "dotenv";
dotenv.config();

import "./database/connection"; //db connection code

import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute'
import cartRoute from './routes/cartRoute'
import adminSeeder from "./adminSeeder";
import cors from 'cors'

app.use(cors({
  origin : '*'
}))
app.use(express.json())

//admin seeder
adminSeeder()

app.use("", userRoute)
app.use("/product", productRoute)
app.use("/cart", cartRoute)

app.listen(PORT, () => {
  console.log("Server has started at port,", PORT);
});
