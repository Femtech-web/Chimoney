"use client";

import React, { useEffect, ReactNode } from "react";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import FullPageLoader from "@/helpers/Loader";
import { getEncryptedData } from "@/utils/encryptData";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { isLoading } = useAppContext();

  const isUserLoggedIn: boolean = getEncryptedData("chipay-user-active");

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/auth/login");
    }
  }, [router, isUserLoggedIn]);

  if (!isUserLoggedIn || isLoading) return <FullPageLoader />;

  return <>{children}</>;
};

export const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { isLoading } = useAppContext();

  const isUserLoggedIn: boolean = getEncryptedData("chipay-user-active");

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push("/dashboard");
    }
  }, [router, isUserLoggedIn]);

  if (isUserLoggedIn || isLoading) return <FullPageLoader />;

  return <>{children}</>;
};
