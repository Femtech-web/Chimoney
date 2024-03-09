import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import AppError from "./helpers/appError";
import { emailValidator } from "./utils/email.validator";
import { formatSubAccount, formatWallet } from "./utils/format.subAccount";
import { formatTransaction } from "./utils/format.transaction";
import {
  SubAcctRequestBody,
  PayoutWalletReqBody,
  PayoutChimoneyReqBody,
  GetTransactionReqBody,
  ChimoneyReceivers,
} from "../typings/types";
import {
  CREATE_SUBACCOUNT_API,
  GET_SUBACCOUNT_API,
  GET_WALLET_API,
  PAYOUT_CHIMONEY_API,
  PAYOUT_WALLET_API,
  GET_SINGLE_TRANSACTION_API,
} from "./API/api.calls";
import { formatPayout } from "./utils/format.payout";

const prisma = new PrismaClient();

class Controller {
  static async SendHealth(req: Request, res: Response) {
    res.status(200).json({ message: "Everything is good!" });
  }

  static async createUserWallet(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
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
        const created_account = formatSubAccount(data);

        const response = await GET_WALLET_API(created_account.account_id);
        if (response && response.status === "success") {
          const user_wallet = formatWallet(response.data);
          const user_account = { ...created_account, user_wallet };
          console.log("USER=================start");
          console.log(user_account);
          console.log("USER=================end");
          const newUser = await prisma.user.create({
            data: {
              fullName: user_data.name,
              email: user_data.email,
              subaccountID: user_account.account_id,
            },
          });

          return res.status(201).json({
            success: true,
            message: `New account has been created!`,
            created_account,
            data: newUser,
          });
        }
      }
    } catch (err: any) {
      if (err.response.data) {
        const serverError = err.response.data.error;
        console.log(
          "SERVER_START-----------------" +
            serverError +
            "--------------------------SERVER_END",
        );
        if (serverError === "already exists") {
          return next(new AppError("Account already exists", 500));
        }
      }

      next(err);
    }
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.email) {
        return next(new AppError(`No credentials provided`, 400));
      }

      const isValidEmail = emailValidator(req.body.email);
      if (!isValidEmail) {
        return next(new AppError(`Email is not valid`, 400));
      }

      const user = await prisma.user.findUnique({
        where: { email: req.body.email },
      });

      if (!user) {
        return next(
          new AppError(
            "A user with the provided information does not exist.",
            409,
          ),
        );
      }

      const [accountRes, walletRes] = await Promise.all([
        GET_SUBACCOUNT_API(user.subaccountID),
        GET_WALLET_API(user.subaccountID),
      ]);

      if (accountRes.data && accountRes.status === "success") {
        const fetched_account = formatSubAccount(accountRes.data);
        let user_account;
        if (walletRes && walletRes.status === "success") {
          const user_wallet = formatWallet(walletRes.data);
          user_account = { ...fetched_account, user_wallet };
        }

        return res.status(200).json({
          success: true,
          message: `user logged in successfully!`,
          newUser: user,
          data: user_account,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async fetchWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const account_id = req.query.id?.toLocaleString();
      if (!account_id) {
        return next(new AppError(`No request query provided`, 400));
      }

      const [accountRes, walletRes] = await Promise.all([
        GET_SUBACCOUNT_API(account_id),
        GET_WALLET_API(account_id),
      ]);

      if (accountRes.data && accountRes.status === "success") {
        const fetched_account = formatSubAccount(accountRes.data);
        let user_account;
        if (walletRes && walletRes.status === "success") {
          const user_wallet = formatWallet(walletRes.data);
          user_account = { ...fetched_account, user_wallet };
        }

        return res.status(200).json({
          success: true,
          message: `User account fetched successfully!`,
          data: user_account,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async fetchSingleTransaction(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const body_params: GetTransactionReqBody = req.body;
      if (!body_params.issueID || !body_params.subAccount) {
        return next(new AppError(`No parameters provided`, 400));
      }

      const { data, status } = await GET_SINGLE_TRANSACTION_API(body_params);
      if (data && status === "success") {
        const formattedTransaction = formatTransaction(data[0]);

        return res.status(200).json({
          success: true,
          message: `Transaction for ${body_params.issueID} fetched successfully!`,
          data: formattedTransaction,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async payNormal(
    body_params: PayoutChimoneyReqBody,
    next: NextFunction,
  ) {
    try {
      if (
        !Array.isArray(body_params.chimoneys) ||
        body_params.chimoneys.length === 0
      ) {
        return next(new AppError(`No receivers provided`, 400));
      }

      const allEmails = body_params.chimoneys.map(
        (receiver: ChimoneyReceivers) => {
          if ("email" in receiver) {
            return receiver.email;
          }
        },
      );

      allEmails.forEach((email) => {
        const isValidEmail = emailValidator(email);
        if (!isValidEmail) {
          return next(new AppError(`Email is not valid`, 400));
        }
      });

      const { data, status } = await PAYOUT_CHIMONEY_API(body_params);
      if (data && status === "success") {
        return formatPayout(data);
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

        const { data, status } = await PAYOUT_WALLET_API(
          body_params as PayoutWalletReqBody,
        );
        if (data && status === "success") {
          payment_response = formatPayout(data);
        }
      } else {
        const response = await Controller.payNormal(body_params, next);
        payment_response = response;
      }

      return res.status(200).json({
        success: true,
        message: `Payout successful!`,
        type: query,
        data: payment_response,
      });
    } catch (err: any) {
      next(err);
    }
  }
}

export default Controller;
