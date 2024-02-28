"use client";

import Image from "next/image";
import { CustomButton } from "@/helpers/CustomStyles";
import { PublicRoute } from "@/helpers/RouteProtection";

export default function Home() {
  return (
    <PublicRoute>
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
          <CustomButton
            variant="contained"
            href="/auth/signup"
            color="secondary"
          >
            Get started
          </CustomButton>
        </div>
      </main>
    </PublicRoute>
  );
}
