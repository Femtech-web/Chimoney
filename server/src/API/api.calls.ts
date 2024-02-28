import CHIPAY_API from "./axios.setup";
import {
  SubAcctRequestBody,
  PayoutChimoneyReqBody,
  PayoutWalletReqBody,
  GetTransactionReqBody,
} from "../typings/types";

export const CREATE_SUBACCOUNT_API = async (payload: SubAcctRequestBody) => {
  try {
    const res = await CHIPAY_API.post("/sub-account/create", payload);

    if (res) {
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};

export const GET_SUBACCOUNT_API = async (account_id: string) => {
  try {
    const res = await CHIPAY_API.get(`/sub-account/get?id=${account_id}`);

    if (res) {
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};

export const GET_SINGLE_TRANSACTION_API = async (
  payload: GetTransactionReqBody,
) => {
  console.log(payload);
  try {
    const res = await CHIPAY_API.post(
      `accounts/issue-id-transactions?issueID=${payload.issueID}`,
      { subAccount: payload.subAccount },
    );

    if (res) {
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};

export const PAYOUT_CHIMONEY_API = async (payload: PayoutChimoneyReqBody) => {
  try {
    const res = await CHIPAY_API.post("/payouts/chimoney", payload);

    if (res) {
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};

export const PAYOUT_WALLET_API = async (payload: PayoutWalletReqBody) => {
  try {
    const res = await CHIPAY_API.post("/payouts/wallet", payload);

    if (res) {
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};
