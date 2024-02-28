"use client";

import React from "react";
import { Box, styled } from "@mui/material";
import { BsArrowLeft } from "react-icons/bs";

const GoBack = () => {
  return (
    <CustomBox>
      <BsArrowLeft fontSize={20} onClick={() => window.history.back()} />
    </CustomBox>
  );
};

export default GoBack;

const CustomBox = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 3.5rem;
  cursor: pointer;

  @media (max-width: 640px) {
    padding: 1rem 1.5rem;
  }
`;
