import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { Request, Response, NextFunction } from "express";
import { env } from "../config";
// const jwt = require("jsonwebtoken");
const uri: string = env.URI ?? "";
const client = new MongoClient(uri);
const database = client.db("WebApplication");
const usersCollection = database.collection("users");
const rolesCollection = database.collection("roles");

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    const err = new Error("Missing Token");
    return next(err);
  }
  // console.log(process.env.SECRET_TOKEN);
  try {
    jwt.verify(token, process.env.SECRET_TOKEN as string);
    next();
  } catch (error) {
    next(error);
    // return res.status(403).json({ message: "Invalid token" });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userInfo = await usersCollection.findOne({ email });
    // console.log(userInfo);
    if (userInfo?.email === email && userInfo?.password === password) {
      res.status(200).send("Login Successful");
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
};
