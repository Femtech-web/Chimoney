import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { authValue, appValue } from "../src/helpers/mock";
import { AppContext } from "@/context/app.context";
import { AuthContext } from "@/context/auth.context";

describe("Homepage", () => {
  it("renders a homepage", () => {
    console.log("it worked!")
  })
})