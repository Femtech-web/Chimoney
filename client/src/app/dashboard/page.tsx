import React from "react";
import { Box } from "@mui/material";
import Navbar from "@/components/Navbar";
import Wallet from "@/components/Wallet";
import Transactions from "@/components/Transactions";

const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      <Wallet />
      <Transactions />
    </Box>
  );
};

export default Dashboard;
