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
import { AppContextProps, AppProviderProps, AlertProps } from "./types";
import { useRouter } from "next/navigation";
import { SignupProps, SigninProps } from "@/components/types";
import { getLocalStorageItem } from "@/utils/localStorage";
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
    console.log(value);
  };

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // ------------------------- Authentication Phases --------------------------------------
  const storedValue: string | null = getLocalStorageItem("chipay-user");
  const storedUser: any = storedValue !== null ? JSON.parse(storedValue) : null;
  const router = useRouter();

  const [user, setUser] = useState<any | null>(storedUser);
  const auth = getAuth();

  // --------- handleAlert ------------
  function handleAlert({ msg, type }: { msg: string; type: string }) {
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
        console.log(res);
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
        localStorage.setItem("chipay-user-active", JSON.stringify(true));
        localStorage.setItem("chipay-user", JSON.stringify(newUser));
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
        setAlert,
        setShowAlert,
        setIsLoading,
        setSignupForm,
        setSigninForm,
        setShowPassword,
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
