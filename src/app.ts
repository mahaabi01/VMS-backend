import express, { Application, Request, Response } from "express";
const app: Application = express();
const PORT: number = 3000;

import * as dotenv from "dotenv";
dotenv.config();

import "./database/connection"; //db connection code

import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import commentRoute from "./routes/commentRoute";
import wishlistRoute from "./routes/wishlistRoute";
import orderRoute from "./routes/orderRoute";
import creditLedgerRoute from "./routes/creditLedgerRoute"
import adminSeeder from "./adminSeeder";
import cors from "cors";

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

//admin seeder
adminSeeder();

app.use("", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/comment", commentRoute);
app.use("/wishlist", wishlistRoute);
app.use("/order", orderRoute);
app.use("/creditledger", creditLedgerRoute)

//giving access to use this folder for reading
app.use(express.static("./src/uploads"));

app.listen(PORT, () => {
  console.log("Server has started at port,", PORT);
});

