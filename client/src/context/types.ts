import {
  Dispatch,
  SetStateAction,
  ReactNode,
  ChangeEvent,
  MouseEvent,
} from "react";
import { SignupProps, SigninProps } from "@/components/types";

export interface AlertProps {
  msg: string;
  type?: string;
}

export interface WalletFormProps {
  receiver: string;
  amount: string;
}

export interface NormalFormProps {
  email: string;
  amount: string;
}

export interface AppContextProps {
  showPassword: boolean;
  isLoading: boolean;
  showAlert: boolean;
  alert: AlertProps;
  userWallet: any;
  walletPayoutForm: WalletFormProps;
  setWalletPayoutForm: Dispatch<SetStateAction<WalletFormProps>>;
  normalPayoutForm: NormalFormProps;
  setNormalPayoutForm: Dispatch<SetStateAction<NormalFormProps>>;
  setUserWallet: Dispatch<SetStateAction<any>>;
  setAlert: Dispatch<SetStateAction<AlertProps>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  handleAlert: ({ msg, type }: AlertProps) => void;
  handlePayout: (type: string) => void;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (event: MouseEvent<HTMLButtonElement>) => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFormData: Dispatch<SetStateAction<any>>,
  ) => void;
}

export interface AuthContextProps {
  signupForm: SignupProps;
  signinForm: SigninProps;
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  setSignupForm: Dispatch<SetStateAction<SignupProps>>;
  setSigninForm: Dispatch<SetStateAction<SigninProps>>;
  handleSignup: () => void;
  handleSignin: () => void;
  handleSignout: () => void;
}

export interface AppProviderProps {
  children: ReactNode;
}

export interface AuthProviderProps {
  children: ReactNode;
}
