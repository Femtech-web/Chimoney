"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Container, Box, Paper, styled, Divider } from "@mui/material";
import { TransactionProps } from "@/components/Transaction";
import Loader from "@/helpers/Loader";
import { GET_SINGLE_TRANSACTION } from "@/API/api.call";
import { useAppContext } from "@/context";
import { formatLocalDate } from "@/utils/formatDate";

const Bar = ({
  header,
  subtext,
}: {
  header: string;
  subtext: string | undefined | null;
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
  const router = useRouter();
  const transactionId = pathName.split("/")[2];
  const { userWallet, handleAlert } = useAppContext();
  const [transaction, setTransaction] = useState<TransactionProps | undefined>(
    undefined,
  );
  console.log(transactionId);

  const transactionDate = formatLocalDate(transaction?.paymentDate);
  const redeemDate = formatLocalDate(transaction?.redeemDate);

  useEffect(() => {
    const payload = {
      issueID: transactionId,
      subAccount: userWallet.account_id,
    };

    async function fetchTarget() {
      const res = await GET_SINGLE_TRANSACTION({
        payload,
        handleAlert,
        router,
      });

      setTransaction(res);
    }

    fetchTarget();
  }, [transactionId]);

  if (transaction === null || transaction === undefined) return <Loader />;

  return (
    <Wrapper maxWidth="sm">
      <h2>Transaction details</h2>
      <CustomPaper elevation={3}>
        <Bar header="Transaction Date" subtext={transactionDate} />
        <Divider />
        <Bar header="Redeem Date" subtext={redeemDate || null} />
        <Divider />
        <Bar header="Wallet Type" subtext={transaction?.type} />
        <Divider />
        <Bar header="Amount" subtext={`${transaction?.amount}$`} />
        <Divider />
        <Bar header="Issuer" subtext={transaction?.issuer} />
        <Divider />
        <Bar header="Receiver" subtext={transaction?.receiver || null} />
        <Divider />
        <Bar
          header="Delivery Status"
          subtext={transaction?.deliveryStatus || null}
        />
        <Divider />
        <Bar header="Status" subtext={transaction?.status} />
        <Divider />
        <Bar header="IssueID" subtext={transaction?.issueID} />
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
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    font-style: normal;
    text-align: left;
  }

  p {
    font-size: 0.95rem;
    font-weight: 400;
    color: slategray;
    text-align: right;
  }
`;
