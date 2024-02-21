"use client";

import React from "react";
import { Container, Box, styled, Paper, Button } from "@mui/material";

const Wallet = () => {
  return (
    <CustomBox>
      <div className="wallet_wrapper">
        <CustomPaper elevation={2}>
          <h2>Wallet</h2>
          <h3>Your Balance</h3>
          <p>$0.00</p>
          <CustomButton variant="contained" color="secondary">
            Send money
          </CustomButton>
        </CustomPaper>
      </div>
    </CustomBox>
  );
};

export default Wallet;

const CustomBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  padding: 4rem 2rem 0 2rem;
  gap: 2.5rem;

  .wallet_wrapper {
    display: flex;
    justify-content: center;
    min-height: 30vh;
    width: 100%;
    border-bottom: 1px solid #ebecf2;
    padding-bottom: 2rem;
  }
`;

const CustomPaper = styled(Paper)`
  min-width: 500px;
  padding: 1rem;
  text-align: center;

  h2 {
    font-weight: 400;
    font-style: normal;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  h3 {
    font-weight: 400;
    font-style: normal;
    font-size: 1.3rem;
    margin-bottom: 0.2rem;
  }

  p {
    font-weight: 500;
    font-style: normal;
    font-size: 2.3rem;
  }
`;

export const CustomButton = styled(Button)`
  text-transform: none;
  font-size: 1rem;
  border-radius: 50px;
  margin-top: 1rem;
`;
