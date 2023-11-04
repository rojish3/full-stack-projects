import { NextFunction, Request, Response } from "express";

export const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("Middleware Error Handling");
  //   const errStatus = res.status || 500;
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message,
  });
};
