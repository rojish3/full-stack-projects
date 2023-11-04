import { Request, Response } from "express";
import * as ProductService from "../Service";
import { config } from "dotenv";

export const addProduct = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await ProductService.addProduct({ ...req.body }));
  } catch (error) {
    res.status(400).json(error);
  }
};
export const listProduct = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await ProductService.listProduct());
  } catch (error) {
    res.status(400).json(error);
  }
};

export const singleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.status(200).json(await ProductService.singleProduct(id));
  } catch (error) {
    res.status(400).json(error);
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await ProductService.udpateProduct({ ...req.body }));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.status(200).json(await ProductService.deleteProduct(id));
  } catch (error) {
    res.status(400).json(error);
  }
};
