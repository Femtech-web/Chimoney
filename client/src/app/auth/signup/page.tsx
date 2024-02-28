"use client";

import React from "react";
import { CustomButton, CustomContainer } from "../../../helpers/CustomStyles";
import { useAppContext, useAuthContext } from "@/context";
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

const SignupPage = () => {
  const { signupForm, setSignupForm, handleSignup } = useAuthContext();
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
          <h2>Create your account</h2>
          <Stack spacing={3} mx={3}>
            <TextField
              label="Fullname"
              variant="outlined"
              name="full_name"
              value={signupForm.full_name}
              onChange={(e) => handleChange(e, setSignupForm)}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              name="email"
              value={signupForm.email}
              onChange={(e) => handleChange(e, setSignupForm)}
            />
            <FormControl variant="outlined">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                name="password"
                value={signupForm.password}
                onChange={(e) => handleChange(e, setSignupForm)}
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
            <FormControl variant="outlined">
              <InputLabel>Confirm Password</InputLabel>
              <OutlinedInput
                name="confirm_password"
                value={signupForm.confirm_password}
                onChange={(e) => handleChange(e, setSignupForm)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
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
              onClick={handleSignup}
            >
              Sign up
            </CustomButton>
          </Stack>
          <div className="btm_text">
            <span>Have an account already?</span>
            <a href="/auth/login">signin</a>
          </div>
        </Box>
      </CustomContainer>
    </PublicRoute>
  );
};

export default SignupPage;
