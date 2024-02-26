import { Response, Request, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import AppError from './helpers/appError';
import { emailValidator } from "./utils/email.validator";
import { formatSubAccount } from "./utils/format.subAccount";
import {
  SubAcctRequestBody,
  PayoutWalletReqBody,
  PayoutChimoneyReqBody
} from './typings/types';
import {
  CREATE_SUBACCOUNT_API,
  GET_SUBACCOUNT_API,
  PAYOUT_CHIMONEY_API,
  PAYOUT_WALLET_API
} from "./API/api.calls";
import { formatPayout } from "./utils/format.payout";

const prisma = new PrismaClient();
// id: 58329172-5e3e-48f9-95ef-19ef2cb194fb
// id: 434396c3-ac55-4c66-bd10-144ab5555500

class Controller {
  static async SendHealth(req: Request, res: Response) {
    res.status(200).json({ message: 'Everything is good!' });
  }

  static async createUserWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const user_data: SubAcctRequestBody = req.body;

      if (!user_data.name || !user_data.email) {
        return next(new AppError(`No credentials provided`, 400));
      }

      const isValidEmail = emailValidator(user_data.email);
      if (!isValidEmail) {
        return next(new AppError(`Email is not valid`, 400));
      }

      const { data, status } = await CREATE_SUBACCOUNT_API(user_data);
      if (data && status === "success") {
        const created_account = formatSubAccount(data, "initial");

        const response = await GET_SUBACCOUNT_API(created_account.account_id);
        if (response.data && response.status === "success") {
          const user_account = formatSubAccount(response.data, "wallet");

          return res.status(200).json({
            success: true,
            message: `New account has been created!`,
            created_account,
            data: user_account,
          })
        }
      }
    } catch (err: any) {
      const serverError = err.response.data.error;
      if (serverError === "already exists") {
        return next(new AppError("Account already exists", 500));
      }

      next(err);
    }
  }

  static async fetchWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const account_id = req.query.id?.toLocaleString();
      if (!account_id) {
        return next(new AppError(`No request query provided`, 400));
      }

      const { data, status } = await GET_SUBACCOUNT_API(account_id);
      if (data && status === "success") {
        const user_account = formatSubAccount(data, "wallet");

        return res.status(200).json({
          success: true,
          message: `User account fetched successfully!`,
          data: user_account,
        })
      }
    } catch (err) {
      next(err)
    }
  }

  static async payNormal(body_params: PayoutChimoneyReqBody, next: NextFunction) {

    try {

      if (!Array.isArray(body_params.chimoneys) || body_params.chimoneys.length === 0) {
        return next(new AppError(`No receivers provided`, 400));
      }

      const allEmails = body_params.chimoneys.map(receiver => {
        if ('email' in receiver) {
          return receiver.email;
        }
      });

      allEmails.forEach((email) => {
        const isValidEmail = emailValidator(email);
        if (!isValidEmail) {
          return next(new AppError(`Email is not valid`, 400));
        }
      })

      const { data, status } = await PAYOUT_CHIMONEY_API(body_params);
      if (data && status === "success") {
        return formatPayout(data);;
      }

    } catch (err) {
      throw err;
    }
  }

  static async payoutChimoney(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query.type;
      const body_params = req.body;
      let payment_response;

      if (query === "wallet") {
        const body_params: PayoutWalletReqBody = req.body;

        if (!body_params.subAccount || !("wallets" in body_params)) {
          return next(new AppError(`No parameters provided`, 400));
        }

        const { data, status } = await PAYOUT_WALLET_API(body_params as PayoutWalletReqBody);
        if (data && status === "success") {
          console.log(data, status);
          payment_response = formatPayout(data);
        }
      } else {
        const response = await Controller.payNormal(body_params, next);
        payment_response = response;
      }

      return res.status(200).json({
        success: true,
        message: `Payout successful!`,
        data: payment_response,
      })
    } catch (err: any) {
      next(err);
    }
  }
}

export default Controller;