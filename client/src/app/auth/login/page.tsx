"use client";

import React from "react";
import { useAuthContext, useAppContext } from "@/context";
import { CustomButton, CustomContainer } from "../../../helpers/CustomStyles";
import { PublicRoute } from "@/helpers/RouteProtection";
import {
  Box,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const LoginPage = () => {
  const { handleSignin, signinForm, setSigninForm } = useAuthContext();
  const {
    handleChange,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  } = useAppContext();

  return (
    <PublicRoute>
      <CustomContainer maxWidth="sm">
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <h2>Login to Chipay</h2>
          <Stack spacing={3} mx={3}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              type="email"
              value={signinForm.email}
              onChange={(e) => handleChange(e, setSigninForm)}
            />
            <FormControl variant="outlined">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                name="password"
                value={signinForm.password}
                onChange={(e) => handleChange(e, setSigninForm)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <CustomButton
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleSignin}
            >
              Login
            </CustomButton>
          </Stack>
          <div className="btm_text">
            <span>New to chipay?</span>
            <a href="/auth/signup">create an account</a>
          </div>
        </Box>
      </CustomContainer>
    </PublicRoute>
  );
};

export default LoginPage;
