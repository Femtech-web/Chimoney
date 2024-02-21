import type { Metadata } from "next";
import LoginPage from "./page";

export const metadata: Metadata = {
  title: "Login | page",
  description: "Welcome back!",
};

const LoginLayout = () => {
  return (
    <main>
      <LoginPage />
    </main>
  );
};

export default LoginLayout;
