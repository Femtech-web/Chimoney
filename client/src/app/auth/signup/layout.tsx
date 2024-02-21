import type { Metadata } from "next";
import SignupPage from "./page";

export const metadata: Metadata = {
  title: "Signup | page",
  description: "Sign up to get started",
};

const SignupLayout = () => {
  return (
    <main>
      <SignupPage />
    </main>
  );
};

export default SignupLayout;
