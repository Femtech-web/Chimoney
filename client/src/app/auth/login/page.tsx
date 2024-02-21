"use client";

import React from "react";
import { CustomButton } from "../../page";
import { CustomContainer } from "../signup/page";
import { Box, Stack, TextField } from "@mui/material";

const LoginPage = () => {
  return (
    <CustomContainer maxWidth="sm">
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <h2>Login to Chipay</h2>
        <Stack spacing={3} mx={3}>
          <TextField label="Email" variant="outlined" />
          <TextField label="Password" variant="outlined" />
          <CustomButton fullWidth variant="contained" color="secondary">
            Login
          </CustomButton>
        </Stack>
        <div className="btm_text">
          <span>New to chipay?</span>
          <a href="/auth/signup">create an account</a>
        </div>
      </Box>
    </CustomContainer>
  );
};

export default LoginPage;
