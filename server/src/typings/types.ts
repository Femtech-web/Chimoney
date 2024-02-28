import { Request } from "express";

export interface CustomRequest extends Request {
  userId?: string | any;
}

export interface SubAcctRequestBody {
  name: string;
  email: string;
}

export interface SubAcctResponseBody {
  account_id: string;
  parent_id: string;
  isAccountVerified: string;
  createdDate: string;
  user_name: string;
  user_email: string;
  user_wallet?: string;
  isSubAccount: string;
}

export interface WalletReceivers {
  receiver: string;
  valueInUSD: number;
}
export interface PayoutWalletReqBody {
  subAccount: string;
  wallets: WalletReceivers[];
}

export interface ChimoneyReceivers {
  email: string;
  valueInUSD: number;
}
export interface PayoutChimoneyReqBody {
  subAccount: string;
  chimoneys: ChimoneyReceivers[];
}

export interface GetTransactionReqBody {
  issueID: String;
  subAccount: string;
}
