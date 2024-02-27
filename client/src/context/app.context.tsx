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
import { useRouter } from "next/navigation";
import { SignupProps, SigninProps } from "@/components/types";
import { CREATE_WALLET, PAYOUT } from "@/API/api.call";
import { getEncryptedData, setEncryptedData } from "@/utils/encryptData";
import { formatUser } from "@/utils/formatUser";
import { signupRequiredFields } from "@/components/dummy";
import "@/configs/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { WalletProps } from "@/API/types";

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  // --------------------------- Form Phases -----------------------------------------
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>({ msg: "", type: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signinForm, setSigninForm] = useState<SigninProps>({
    email: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState<SignupProps>({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFormData: Dispatch<SetStateAction<any>>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // ------------------------- App states --------------------------------------
  const [walletPayoutForm, setWalletPayoutForm] = useState<WalletFormProps>({
    receiver: "",
    amount: 0,
  });
  const [normalPayoutForm, setNormalPayoutForm] = useState<NormalFormProps>({
    email: "",
    amount: 0,
  });

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

      setNormalPayoutForm({ email: "", amount: 0 });
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

      setWalletPayoutForm({ receiver: "", amount: 0 });
    }
  };

  // ------------------------- Authentication Phases --------------------------------------
  const storedUser: any = getEncryptedData("chipay-user");
  const storedWallet: any = getEncryptedData("chipay-wallet");
  const router = useRouter();

  const [user, setUser] = useState<any | null>(storedUser);
  const [userWallet, setUserWallet] = useState<any | null>(storedWallet);
  const auth = getAuth();

  // --------- handleAlert ------------
  function handleAlert({ msg, type }: AlertProps) {
    setIsLoading(false);
    setAlert({ msg, type });
    setShowAlert(true);
  }

  // ---------- resetForm --------
  function reset(type: string) {
    if (type === "signup") {
      setSignupForm({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    } else {
      setSigninForm({ email: "", password: "" });
    }
  }

  // ---------- handleFormValidations --------------
  function handleFormValidations(type: string, requiredFields: string[]) {
    if (type === "signup") {
      const isAnyRequiredFieldEmpty = requiredFields.some(
        (field) => !signupForm[field as keyof SignupProps]
      );

      if (isAnyRequiredFieldEmpty) {
        handleAlert({ msg: "Please fill out all fields!", type: "err" });
        return true;
      }
      if (signupForm.password !== signupForm.confirm_password) {
        handleAlert({ msg: "passwords do not match!", type: "err" });
        return true;
      }
      if (signupForm.password.length < 8) {
        handleAlert({ msg: "password too short!", type: "err" });
        return true;
      }
    } else {
      const isAnyRequiredFieldEmpty = requiredFields.some(
        (field) => !signinForm[field as keyof SigninProps]
      );

      if (isAnyRequiredFieldEmpty) {
        handleAlert({ msg: "Please fill out all fields!", type: "err" });
        return true;
      }
      if (signinForm.password.length < 8) {
        handleAlert({ msg: "password too short!", type: "err" });
        return true;
      }
    }

    return false;
  }

  // ------------ handleSignup -----------
  const handleSignup = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (handleFormValidations("signup", signupRequiredFields)) {
        return;
      }

      const res = await createUserWithEmailAndPassword(
        auth,
        signupForm.email,
        signupForm.password
      );

      if (res.user) {
        let userName = signupForm.full_name;
        setEncryptedData(userName, "chipay-userName");
        const userData: WalletProps = {
          name: signupForm.full_name,
          email: res.user.email,
        };

        await CREATE_WALLET({
          userData,
          handleAlert,
          setUserWallet,
          setIsLoading,
        });

        reset("signup");

        router.push("/auth/login");
        setIsLoading(false);
      }
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);

      const errorCode = err.code;
      const errorMessage = err.message;

      if (errorCode === "auth/weak-password") {
        handleAlert({ msg: "The password is too weak.", type: "err" });
      } else {
        handleAlert({ msg: errorMessage, type: "err" });
      }
    }
  };

  // ---------- state observer ----------
  // onAuthStateChanged(auth, function (User) {
  //   if (User) {
  //     const newUser = formatUser(User);
  //     setUser(newUser);
  //   } else {
  //     setUser(null);
  //   }
  // });

  // ------------- handleSignin -----------
  const handleSignin = async () => {
    const requiredFields = ["email", "password"];

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (handleFormValidations("signin", requiredFields)) {
        return;
      }

      const res = await signInWithEmailAndPassword(
        auth,
        signinForm.email,
        signinForm.password
      );

      if (res.user) {
        const newUser = formatUser(res.user);
        setUser(newUser);
        setEncryptedData(true, "chipay-user-active");
        setEncryptedData(newUser, "chipay-user");
        reset("signin");

        console.log(res);
        router.push("/dashboard");
        setIsLoading(false);
      }
      setIsLoading(false);
      console.log(res);
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);

      const errorCode = err.code;
      const errorMessage = err.message;

      if (errorCode === "auth/wrong-password") {
        handleAlert({ msg: "Wrong password.", type: "err" });
      } else {
        handleAlert({ msg: errorMessage, type: "err" });
      }
    }
  };

  // --------- handleSignout -----------
  const handleSignout = () => {
    if (auth.currentUser) {
      signOut(auth);
      setUser(null);
      localStorage.removeItem("chipay-user-active");
      localStorage.removeItem("chipay-user");
      router.push("/auth/login");
    }
  };

  return (
    <AppContext.Provider
      value={{
        signupForm,
        signinForm,
        showPassword,
        isLoading,
        showAlert,
        alert,
        user,
        userWallet,
        normalPayoutForm,
        walletPayoutForm,
        setWalletPayoutForm,
        setNormalPayoutForm,
        setUserWallet,
        setUser,
        setAlert,
        setShowAlert,
        setIsLoading,
        setSignupForm,
        setSigninForm,
        setShowPassword,
        handlePayout,
        handleSignup,
        handleSignin,
        handleSignout,
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
