import express, { Express, NextFunction, Request, Response } from "express";
// import MongoClient from 'mongodb';
const { MongoClient } = require("mongodb");
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
import { env } from "./config/index";

import userRoutes from "./User";
import productsRoutes from "./Products";
import requestRoutes from "./Requests";
import { handleError } from "./middlewares/handleError";

const app: Express = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());

// app.get("/", (req: Request, res: Response) => {
//   res.send("Server is running...");
// });
app.use("/", userRoutes());
app.use("/product", productsRoutes());
app.use("/request", requestRoutes());

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Cannot find path on server") as any;
  err.status = 404;
  next(err);
  // res.status(400).send("Path not found");
});

app.use(handleError);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
});
