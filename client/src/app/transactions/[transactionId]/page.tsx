"use client";

import React, { useEffect, useState } from "react";
import { Container, Box, Paper, styled, Divider } from "@mui/material";
import { usePathname } from "next/navigation";
import { transactions } from "@/components/dummy";
import Loader from "@/components/Loader";

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

const Bar = ({
  header,
  subtext,
}: {
  header: string;
  subtext: string | undefined;
}) => {
  return (
    <CustomBox>
      <h3>{header}</h3>
      <p>{subtext}</p>
    </CustomBox>
  );
};

const TransactionPage = () => {
  const pathName = usePathname();
  const transactionId = parseInt(pathName.split("/")[2]);
  const [transaction, setTransaction] = useState<TransactionProps | undefined>(
    undefined
  );
  console.log(transactionId);

  useEffect(() => {
    function fetchTarget() {
      const foundItem = transactions.find((item) => item.id === transactionId);

      return foundItem;
    }

    const res = fetchTarget();
    setTransaction(res);
  }, [transactionId]);

  if (transaction === null) return <Loader />;

  return (
    <Wrapper maxWidth="sm">
      <h2>Transaction details</h2>
      <CustomPaper elevation={3}>
        <Bar header="Transaction Date" subtext={transaction?.date} />
        <Divider />
        <Bar header="Transaction Type" subtext={transaction?.type} />
        <Divider />
        <Bar header="Account Number" subtext={transaction?.acctNo} />
        <Divider />
        <Bar header="Amount" subtext={transaction?.amount} />
        <Divider />
        <Bar header="Narration" subtext={transaction?.desc} />
        <Divider />
      </CustomPaper>
    </Wrapper>
  );
};

export default TransactionPage;

export const Wrapper = styled(Container)`
  h2 {
    font-weight: 400;
    font-style: normal;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

export const CustomPaper = styled(Paper)`
  min-width: 300px;
  min-height: 250px;
  padding: 1rem;
  border-radius: 5px;
`;

export const CustomBox = styled(Box)`
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
    font-size: 0.95rem;
    font-weight: 400;
    color: slategray;
  }
`;
