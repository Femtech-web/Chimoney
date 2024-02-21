"use client";

import Image from "next/image";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export default function Home() {
  return (
    <main className="bg_wrapper">
      <div className="logo_container">
        <span>
          <Image
            src="/logo-black.png"
            alt="company logo"
            width={100}
            height={30}
          />
        </span>
      </div>
      <div className="text-wrapper">
        <h1>Send and Receive Money with Ease</h1>
        <p>
          Control your finance and wallet, make payments <br /> receive your
          finances from anywhere.
        </p>
        <CustomButton variant="contained" href="/auth/signup" color="secondary">
          Get started
        </CustomButton>
      </div>
    </main>
  );
}

export const CustomButton = styled(Button)`
  font-family: "Poppins", sans-serif;
  text-transform: none;
  font-size: 1.3rem;
`;
