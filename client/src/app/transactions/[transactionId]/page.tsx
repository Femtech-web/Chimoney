/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Divider } from "@mui/material";
import { TransactionProps } from "@/components/Transaction";
import Loader from "@/helpers/Loader";
import { GET_SINGLE_TRANSACTION } from "@/API/api.call";
import { useAppContext } from "@/context";
import { formatLocalDate } from "@/utils/formatDate";
import {
  TransactionCustomBox,
  TransactionCustomPaper,
  TransactionWrapper,
} from "@/helpers/CustomStyles";

const Bar = ({
  header,
  subtext,
}: {
  header: string;
  subtext: string | undefined | null;
}) => {
  return (
    <TransactionCustomBox>
      <h3>{header}</h3>
      <p>{subtext}</p>
    </TransactionCustomBox>
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

  const transactionDate = formatLocalDate(transaction?.paymentDate);
  const redeemDate = formatLocalDate(transaction?.redeemDate);

  useEffect(() => {
    const payload = {
      issueID: transactionId,
      subAccount: userWallet?.account_id,
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
    <TransactionWrapper maxWidth="sm">
      <h2>Transaction details</h2>
      <TransactionCustomPaper elevation={3}>
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
      </TransactionCustomPaper>
    </TransactionWrapper>
  );
};

export default TransactionPage;
