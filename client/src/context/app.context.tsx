"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import {
  AppContextProps,
  AppProviderProps,
  AlertProps,
  WalletFormProps,
  NormalFormProps,
} from "./types";
import { PAYOUT, GET_WALLET } from "@/API/api.call";
import { getEncryptedData } from "@/utils/encryptData";
import "@/configs/firebase";

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const storedWallet: any = getEncryptedData("chipay-wallet");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>({ msg: "", type: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userWallet, setUserWallet] = useState<any | null>(storedWallet);
  const [walletPayoutForm, setWalletPayoutForm] = useState<WalletFormProps>({
    receiver: "",
    amount: "",
  });
  const [normalPayoutForm, setNormalPayoutForm] = useState<NormalFormProps>({
    email: "",
    amount: "",
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (showAlert) {
        setShowAlert(false);
        setAlert({ msg: "", type: "" });
      }
    }, 5000);

    return () => clearTimeout(timerId);
  }, [showAlert]);

  useEffect(() => {
    async function getWallet() {
      const walletId = userWallet.account_id;
      await GET_WALLET({ walletId, setUserWallet, handleAlert });
    }

    getWallet();
  }, []);

  // --------- handleAlert ------------
  function handleAlert({ msg, type }: AlertProps) {
    setIsLoading(false);
    setAlert({ msg, type });
    setShowAlert(true);
  }

  // --------- handleFormInputChange ------------
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFormData: Dispatch<SetStateAction<any>>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // --------- handlePayout ---------------
  const handlePayout = async (type: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const walletId = userWallet.account_id;
    if (type === "anyone") {
      const payload = normalPayoutForm;
      await PAYOUT({
        payload,
        type,
        handleAlert,
        setIsLoading,
        setUserWallet,
        walletId,
      });

      setNormalPayoutForm({ email: "", amount: "" });
    } else {
      const payload = walletPayoutForm;
      await PAYOUT({
        payload,
        type,
        handleAlert,
        setIsLoading,
        setUserWallet,
        walletId,
      });

      setWalletPayoutForm({ receiver: "", amount: "" });
    }
  };

  return (
    <AppContext.Provider
      value={{
        showPassword,
        isLoading,
        showAlert,
        alert,
        userWallet,
        normalPayoutForm,
        walletPayoutForm,
        setWalletPayoutForm,
        setNormalPayoutForm,
        setUserWallet,
        setAlert,
        setShowAlert,
        setIsLoading,
        setShowPassword,
        handleAlert,
        handlePayout,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
