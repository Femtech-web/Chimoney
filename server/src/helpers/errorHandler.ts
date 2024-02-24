import { NextFunction, Request, Response } from "express";
import AppError from "./appError";

const sendProError = (err: AppError, req: Request, res: Response) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        error: err.message,
      });
    }

    console.log('ERROR 🔥:', err);
    return res.status(500).json({
      title: 'Something went very wrong!',
      message: err.message,
    });
  }

  //   Render website
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: `Something went wrong! ${err.message}.`
    });
  }

  console.log('ERROR 🔥:', err);
  return res.status(err.statusCode).json({
    error: 'Something went wrong! Please try again later.'
  });
};

export default (err: AppError, req: Request, res: Response, next: NextFunction) => {
  sendProError(err, req, res);
};