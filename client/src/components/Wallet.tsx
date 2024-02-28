"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  styled,
  Paper,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { useAppContext } from "@/context";
import { AiOutlineClose } from "react-icons/ai";
import { payoutOptions } from "./dummy";
import { CustomBox as LoaderBox } from "@/helpers/Loader";
import { CustomButton as SubmitButton } from "@/app/page";

const Wallet = () => {
  const {
    userWallet,
    normalPayoutForm,
    walletPayoutForm,
    setNormalPayoutForm,
    setWalletPayoutForm,
    handleChange,
    handlePayout,
  } = useAppContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentOption, setCurrentOption] = useState<string>("anyone");

  const handleSubmit = () => {
    setIsOpen(false);
    handlePayout(currentOption);
  };

  return (
    <CustomBox>
      <div className="wallet_wrapper">
        <CustomPaper elevation={2}>
          <h2>Wallet</h2>
          <h3>Your Balance</h3>
          <p>{`${"$"}${userWallet?.user_wallet?.balance}`}</p>
          <CustomButton
            variant="contained"
            color="secondary"
            onClick={() => setIsOpen(true)}
          >
            Send money
          </CustomButton>
        </CustomPaper>
      </div>
      {isOpen && (
        <PaymentBox>
          <span onClick={() => setIsOpen(false)}>
            <AiOutlineClose fontSize={25} color="white" />
          </span>
          <PaymentPaper>
            <Box className="option_box">
              {payoutOptions.map((option: any, index: number) => (
                <div
                  onClick={() => setCurrentOption(option.name)}
                  key={index}
                  className="option_container"
                >
                  <p
                    className={`${
                      currentOption === option.name && "active_option"
                    } option`}
                  >
                    {option.title}
                  </p>
                  {currentOption === option.name && <div className="switch" />}
                </div>
              ))}
            </Box>
            <FormBox>
              {currentOption === "anyone" ? (
                <Stack spacing={3}>
                  <TextField
                    variant="outlined"
                    name="email"
                    label="Email"
                    value={normalPayoutForm.email}
                    onChange={(e) => handleChange(e, setNormalPayoutForm)}
                  />
                  <TextField
                    variant="outlined"
                    name="amount"
                    label="Amount($)"
                    value={normalPayoutForm.amount}
                    onChange={(e) => handleChange(e, setNormalPayoutForm)}
                  />
                </Stack>
              ) : (
                <Stack spacing={3}>
                  <TextField
                    variant="outlined"
                    name="receiver"
                    label="chimoney ID"
                    value={walletPayoutForm.receiver}
                    onChange={(e) => handleChange(e, setWalletPayoutForm)}
                  />
                  <TextField
                    variant="outlined"
                    name="amount"
                    label="Amount"
                    value={walletPayoutForm.amount}
                    onChange={(e) => handleChange(e, setWalletPayoutForm)}
                  />
                </Stack>
              )}
            </FormBox>
            <SubmitButton
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Payout
            </SubmitButton>
          </PaymentPaper>
        </PaymentBox>
      )}
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

const PaymentBox = styled(LoaderBox)`
  background-color: rgba(0, 0, 0, 0.5);

  span {
    position: absolute;
    right: 1.5rem;
    top: 1rem;
    cursor: pointer;
  }
`;

const PaymentPaper = styled(Paper)`
  min-width: 500px;
  padding: 1rem;

  .option_box {
    display: flex;
    border-bottom: 1px solid black;
    justify-content: center;
    gap: 1rem;
  }

  .option_container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
  }

  .option {
    color: grey;
    font-weight: 500;
    font-size: 1rem;
  }

  .active_option {
    color: black;
  }

  .switch {
    width: 60%;
    background-color: black;
    border-radius: 2px 2px 0 0;
    height: 3px;
  }
`;

const FormBox = styled(Box)`
  padding: 1.5rem 0.5rem;
`;
