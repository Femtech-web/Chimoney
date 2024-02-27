import API from "./axios.setup";
import { CreateWalletProps, GetWalletProps, PayoutProps } from "./types";
import { setEncryptedData } from "@/utils/encryptData";
import { formatPayout } from "@/utils/formatPayout";

export const CREATE_WALLET = async ({ userData, handleAlert, setUserWallet, setIsLoading }: CreateWalletProps) => {
  try {
    console.log(userData)
    const { data, status } = await API.post("/createWallet", userData)

    if (data && status === 201) {
      setUserWallet(data);
      setEncryptedData(data.data, "chipay-wallet");
      setIsLoading(false);
      handleAlert({ msg: "wallet created successfully!" })
      console.log(data)
    }
  } catch (err: any) {
    setIsLoading(false);
    handleAlert({ msg: err.response.data.error, type: "err" })
    console.log(err);
  }
}

export const GET_WALLET = async ({ walletId, setUserWallet, handleAlert }: GetWalletProps) => {
  try {
    const { data, status } = await API.post(`/wallet?id={${walletId}}`)
    if (data && status === 200) {
      setUserWallet(data);
      setEncryptedData(data.data, "chipay-wallet");
    }
  } catch (err: any) {
    handleAlert({ msg: err.response.data.error, type: "err" })
    console.log(err);
  }
}

export const PAYOUT = async ({ payload, type, walletId, handleAlert, setIsLoading, setUserWallet }: PayoutProps) => {
  try {
    const formattedPayload = formatPayout(type, payload);
    const { data, status } = await API.post(`/payout?type={${type}}`, formattedPayload);
    if (data && status === 200) {
      console.log(data)
      setIsLoading(false);
      handleAlert({ msg: "Payout successfull!" })

      setTimeout(async () => {
        await GET_WALLET({ walletId, setUserWallet, handleAlert });
      }, 2000)
    }
  } catch (err: any) {
    setIsLoading(false);
    handleAlert({ msg: err.response.data.error, type: "err" })
    console.log(err);
  }
}