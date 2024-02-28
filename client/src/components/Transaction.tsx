import React from "react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { Paper, styled, Typography } from "@mui/material";
import { formatDate } from "@/utils/formatDate";
import { determineType } from "@/utils/determineType";

export interface TransactionProps {
  id?: string;
  description?: string;
  amount: string;
  meta: any;
  newBalance?: string;
  balanceBefore?: string;
  trfMzt?: any;
  type?: string;
  receiver?: string;
  issuer?: string;
  issueID?: string;
  paymentDate?: string;
  redeemDate?: string;
  currency?: string;
  deliveryStatus?: string;
  status?: string;
}

const Transaction = ({ amount, description, meta }: TransactionProps) => {
  const date = formatDate(meta.date._seconds);
  const type = determineType(amount);

  return (
    <CustomBox elevation={3}>
      <span>
        {type === "credit" ? (
          <BsArrowUp fontSize={20} color="green" />
        ) : (
          <BsArrowDown fontSize={20} color="red" />
        )}
      </span>
      <div>
        <p className="desc">
          {description
            ? description.length < 20
              ? description
              : description?.slice(0, 20)
            : null}
        </p>
        <p className="date">{date}</p>
      </div>
      {type === "credit" ? (
        <Typography color="green">{`${amount}$`}</Typography>
      ) : (
        <Typography color="red">{`${amount}$`}</Typography>
      )}
    </CustomBox>
  );
};

export default Transaction;

const CustomBox = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  gap: 0.5rem;
  border-radius: 5px;

  .desc {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .date {
    font-size: 0.9rem;
    font-weight: 400;
    color: slategrey;
  }
`;
