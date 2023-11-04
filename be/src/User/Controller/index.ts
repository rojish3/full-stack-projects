import { NextFunction, Request, Response } from "express";
import {
  Users,
  Create,
  Login,
  Profile,
  ForgotPassword,
  ResetPassword,
  Remove,
  UserDetails,
} from "../Service";
const jwt = require("jsonwebtoken");

export const list = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await Users());
  } catch (error) {
    res.status(400).json(error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await Create({ ...req.body }));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const userDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.status(200).json(await UserDetails(id));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.status(200).json(await Remove(id));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const result = await Login({ ...req.body });
    // console.log(result.accesstoken, "token");
    // localStorage.setItem("token", result.accesstoken);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json(error.message);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    res.status(200).json(await ForgotPassword(email));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    const { password } = req.body;
    // console.log(id);
    // console.log(token);
    // console.log(password);
    res.status(200).json(await ResetPassword(token, password));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await Profile());
  } catch (error) {
    res.status(400).json(error);
  }
};
