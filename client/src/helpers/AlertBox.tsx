"use client";

import React from "react";
import { useAppContext } from "@/context";
import { Slide, Alert } from "@mui/material";

const AlertBox = () => {
  const { alert, showAlert } = useAppContext();
  const isError = alert.type === "err";

  return (
    <Slide direction="right" in={showAlert} mountOnEnter unmountOnExit>
      <Alert severity={isError ? "error" : "success"}>{alert.msg}</Alert>
    </Slide>
  );
};

export default AlertBox;
