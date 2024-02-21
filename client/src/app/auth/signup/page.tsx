"use client";

import React from "react";
import { CustomButton } from "../../page";
import { Box, Container, Stack, styled, TextField } from "@mui/material";

const SignupPage = () => {
  return (
    <CustomContainer maxWidth="sm">
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <h2>Create your account</h2>
        <Stack spacing={3} mx={3}>
          <TextField label="Fullname" variant="outlined" />
          <TextField label="Email" variant="outlined" />
          <TextField label="Password" variant="outlined" />
          <TextField label="Confirm password" variant="outlined" />
          <CustomButton fullWidth variant="contained" color="secondary">
            Sign up
          </CustomButton>
        </Stack>
        <div className="btm_text">
          <span>Have an account already?</span>
          <a href="/auth/login">signin</a>
        </div>
      </Box>
    </CustomContainer>
  );
};

export default SignupPage;

export const CustomContainer = styled(Container)`
  min-height: 100vh;
  padding: 7% 0;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .btm_text {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    gap: 0.5rem;

    a {
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: blue;
      }
    }
  }
`;
