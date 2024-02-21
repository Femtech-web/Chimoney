"use client";

import React from "react";
import { Container, Box, Paper, styled, Divider } from "@mui/material";
import { usePathname } from "next/navigation";

interface TransactionProps {
  id: number;
  date: string;
  type: string;
  amount: string;
  initiator: string;
  bank: string;
  acctNo: string;
  desc: string;
}

const Bar = ({ header, subtext }: { header: string; subtext: string }) => {
  return (
    <CustomBox>
      <h3>{header}</h3>
      <p>{subtext}</p>
    </CustomBox>
  );
};

const TransactionPage = ({
  id,
  date,
  type,
  amount,
  initiator,
  bank,
  acctNo,
  desc,
}: TransactionProps) => {
  const pathName = usePathname();
  const transactionId = pathName.split("/")[2];
  console.log(transactionId);

  return (
    <Wrapper maxWidth="sm">
      <h2>Transaction details</h2>
      <CustomPaper elevation={3}>
        <Bar header="Transaction Date" subtext={date} />
        <Divider />
        <Bar header="Transaction Type" subtext={type} />
        <Divider />
        <Bar header="Account Number" subtext={acctNo} />
        <Divider />
        <Bar header="Amount" subtext={amount} />
        <Divider />
        <Bar header="Narration" subtext={desc} />
        <Divider />
      </CustomPaper>
    </Wrapper>
  );
};

export default TransactionPage;

const Wrapper = styled(Container)`
  h2 {
    font-weight: 400;
    font-style: normal;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
`;
const CustomPaper = styled(Paper)`
  min-width: 300px;
  min-height: 250px;
  padding: 1rem;
  border-radius: 5px;
`;

const CustomBox = styled(Box)`
  width: 100%;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    font-style: normal;
  }

  p {
    font-size: 0.85rem;
    font-weight: 400;
    color: slategray;
  }
`;
