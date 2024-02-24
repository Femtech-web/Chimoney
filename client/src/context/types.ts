import { Dispatch, SetStateAction, ReactNode, ChangeEvent, MouseEvent } from "react";
import { SignupProps, SigninProps } from "@/components/types";

export interface AlertProps {
  msg: string;
  type: string;
}

export interface AppContextProps {
  signupForm: SignupProps;
  signinForm: SigninProps;
  showPassword: boolean;
  isLoading: boolean;
  showAlert: boolean;
  alert: AlertProps;
  setAlert: Dispatch<SetStateAction<AlertProps>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSignupForm: Dispatch<SetStateAction<SignupProps>>;
  setSigninForm: Dispatch<SetStateAction<SigninProps>>;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  handleSignup: () => void;
  handleSignin: () => void;
  handleSignout: () => void;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (event: MouseEvent<HTMLButtonElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFormData: Dispatch<SetStateAction<any>>) => void;
}

export interface AppProviderProps {
  children: ReactNode;
}
