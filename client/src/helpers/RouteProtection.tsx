"use client";

import React, { useEffect, ReactNode } from "react";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import FullPageLoader from "@/helpers/Loader";
import { getLocalStorageItem } from "@/utils/localStorage";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { isLoading } = useAppContext();

  const storedValue: string | null = getLocalStorageItem("chipay-user-active");
  const isUserLoggedIn: string =
    storedValue !== null ? JSON.parse(storedValue) : null;

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

  const storedValue: string | null = getLocalStorageItem("chipay-user-active");
  const isUserLoggedIn: string =
    storedValue !== null ? JSON.parse(storedValue) : null;

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push("/dashboard");
    }
  }, [router, isUserLoggedIn]);

  if (isUserLoggedIn || isLoading) return <FullPageLoader />;

  return <>{children}</>;
};
