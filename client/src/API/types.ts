import { Dispatch, SetStateAction } from "react";
import { NormalFormProps, WalletFormProps, AlertProps } from "@/context/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface WalletProps {
  name: string | null;
  email: string | null;
}
export interface Transaction {
  issueID: string;
  subAccount: string;
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

export interface TransactionProps {
  payload: Transaction;
  handleAlert: ({ msg }: AlertProps) => void;
  router: AppRouterInstance;
}
