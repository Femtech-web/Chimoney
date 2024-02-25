import { Request } from "express";

export interface CustomRequest extends Request {
  userId?: string | any;
}

export interface SubAcctRequestBody {
  name: string;
  email: string;
}