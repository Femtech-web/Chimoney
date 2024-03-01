import API from "./axios.setup";
import {
  CreateWalletProps,
  LoginProps,
  GetWalletProps,
  PayoutProps,
  TransactionProps,
} from "./types";
import { setEncryptedData } from "@/utils/encryptData";
import { formatPayout } from "@/utils/formatPayout";

export const CREATE_WALLET = async ({
  userData,
  handleAlert,
  setUserWallet,
  setIsLoading,
}: CreateWalletProps) => {
  try {
    console.log(userData);
    const { data, status } = await API.post("/createWallet", userData);
    console.log(data);

    if (data && status === 201) {
      setIsLoading(false);
      handleAlert({ msg: "wallet created successfully!" });
    }
  } catch (err: any) {
    console.log(err);
    setIsLoading(false);
    handleAlert({ msg: err.response.data.error, type: "err" });
  }
};

export const LOGIN_USER = async ({
  userEmail,
  handleAlert,
  setUserWallet,
  setIsLoading,
}: LoginProps) => {
  try {
    const { data, status } = await API.post("/login", { email: userEmail });

    if (data && status === 200) {
      setUserWallet(data.data);
      setEncryptedData(data.data, "chipay-wallet");
      setIsLoading(false);
      handleAlert({ msg: "user login successfull!" });

      return data.newUser;
    }
  } catch (err: any) {
    setIsLoading(false);
    handleAlert({ msg: err.response.data.error, type: "err" });
  }
};

export const GET_WALLET = async ({
  walletId,
  setUserWallet,
  handleAlert,
}: GetWalletProps) => {
  try {
    const { data, status } = await API.get(`/wallet?id=${walletId}`);
    if (data && status === 200) {
      setUserWallet(data.data);
      setEncryptedData(data.data, "chipay-wallet");
    }
  } catch (err: any) {
    handleAlert({ msg: err.response.data.error, type: "err" });
  }
};

export const GET_SINGLE_TRANSACTION = async ({
  payload,
  handleAlert,
  router,
}: TransactionProps) => {
  try {
    const { data, status } = await API.post(`/transaction`, payload);
    if (data && status === 200) {
      return data.data;
    }
  } catch (err: any) {
    handleAlert({ msg: err.response.data.error, type: "err" });
    router.push("/transactions");
  }
};

export const PAYOUT = async ({
  payload,
  type,
  walletId,
  handleAlert,
  setIsLoading,
  setUserWallet,
}: PayoutProps) => {
  try {
    const formattedPayload = formatPayout(type, payload);
    const { data, status } = await API.post(
      `/payout?type={${type}}`,
      formattedPayload,
    );
    if (data && status === 200) {
      setIsLoading(false);
      handleAlert({ msg: "Payout successfull!" });

      setTimeout(async () => {
        await GET_WALLET({ walletId, setUserWallet, handleAlert });
      }, 2000);
    }
  } catch (err: any) {
    setIsLoading(false);
    handleAlert({ msg: err.response.data.error, type: "err" });
  }
};
