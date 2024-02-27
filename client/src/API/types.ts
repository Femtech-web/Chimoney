import { Dispatch, SetStateAction } from "react";
import { NormalFormProps, WalletFormProps, AlertProps } from "@/context/types";

export interface WalletProps {
  name: string | null;
  email: string | null;
}

export interface CreateWalletProps {
  userData: WalletProps;
  handleAlert: ({ msg }: AlertProps) => void;
  setUserWallet: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface GetWalletProps {
  walletId: string;
  setUserWallet: Dispatch<SetStateAction<any>>;
  handleAlert: ({ msg }: AlertProps) => void;
}

export interface PayoutProps {
  walletId: string;
  payload: NormalFormProps | WalletFormProps;
  type: string;
  handleAlert: ({ msg }: AlertProps) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setUserWallet: Dispatch<SetStateAction<any>>;
}
