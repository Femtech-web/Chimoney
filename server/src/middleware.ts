import { Response, NextFunction } from "express";
import { CustomRequest } from "../typings/types";

export default function ValidateUser(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const userId = req.headers["x-userid"];

  if (!userId)
    return res.status(404).json({
      successful: false,
      message: "Unauthorized Access",
    });

  req.userId = userId;
  next();
}
