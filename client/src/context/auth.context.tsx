"use client";

import { createContext, useContext, useState } from "react";
import { AuthContextProps, AuthProviderProps } from "./types";
import { useRouter } from "next/navigation";
import { WalletProps } from "@/API/types";
import { useAppContext } from ".";
import { SignupProps, SigninProps } from "@/components/types";
import { CREATE_WALLET } from "@/API/api.call";
import { getEncryptedData, setEncryptedData } from "@/utils/encryptData";
import { formatUser } from "@/utils/formatUser";
import { signupRequiredFields } from "@/components/dummy";
import "@/configs/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { handleAlert, setIsLoading, isLoading, setUserWallet } =
    useAppContext();
  const storedUser: any = getEncryptedData("chipay-user");
  const router = useRouter();

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

  const [user, setUser] = useState<any | null>(storedUser);
  const auth = getAuth();

  // ---------- handleFormValidations --------------
  function handleFormValidations(type: string, requiredFields: string[]) {
    if (type === "signup") {
      const isAnyRequiredFieldEmpty = requiredFields.some(
        (field) => !signupForm[field as keyof SignupProps],
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
        (field) => !signinForm[field as keyof SigninProps],
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
        signupForm.password,
      );

      if (res.user) {
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

      const errorCode = err.code;
      const errorMessage = err.message;

      if (errorCode === "auth/weak-password") {
        handleAlert({ msg: "The password is too weak.", type: "err" });
      } else {
        handleAlert({ msg: errorMessage, type: "err" });
      }
    }
  };

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
        signinForm.password,
      );

      if (res.user) {
        const newUser = formatUser(res.user);
        setUser(newUser);
        setEncryptedData(true, "chipay-user-active");
        setEncryptedData(newUser, "chipay-user");
        reset("signin");

        router.push("/dashboard");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);

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
      localStorage.removeItem("chipay-wallet");
      router.push("/auth/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signupForm,
        signinForm,
        user,
        setUser,
        setSignupForm,
        setSigninForm,
        handleSignup,
        handleSignin,
        handleSignout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};