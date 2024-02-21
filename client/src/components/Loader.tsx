"use client";

import React from "react";
import { CircularProgress, Box, styled } from "@mui/material";
import { useCustomState } from "@/hooks/responsive";

const Loader = () => {
  const [mobile] = useCustomState();

  return (
    <CustomBox>
      <CircularProgress size={mobile ? 40 : 80} thickness={2} />
    </CustomBox>
  );
};

export default Loader;

export const CustomBox = styled(Box)`
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
`;
