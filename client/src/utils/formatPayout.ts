import { getEncryptedData } from "./encryptData";

export const formatPayout = (type: string, payload: any) => {
  const storedWallet: any = getEncryptedData("chipay-wallet");
  const subAccount = storedWallet.account_id;

  if (type === "anyone") {
    const newPayload = {
      email: payload.email,
      valueInUSD: parseInt(payload.amount),
    };

    return {
      subAccount,
      chimoneys: [newPayload],
    };
  } else {
    const newPayload = {
      receiver: payload.email,
      valueInUSD: parseInt(payload.amount),
    };

    return {
      subAccount,
      wallets: [newPayload],
    };
  }
};
