import { Request, Response } from "express";
import * as RequestServices from "../Service";
export const addRequest = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await RequestServices.addRequest({ ...req.body }));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const listRequest = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await RequestServices.listRequest());
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateRequest = async (req: Request, res: Response) => {
  try {
    const id = req.params;
    // console.log(id);
    const data = req.body;
    // console.log(data);
    res.status(200).json(await RequestServices.updatedRequest(id, data));
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params;
    res.status(200).json(await RequestServices.deleteRequest(id));
  } catch (error) {
    res.status(400).json(error);
  }
};
