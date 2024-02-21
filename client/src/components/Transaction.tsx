import React from "react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { Box, Paper, styled, Typography } from "@mui/material";

interface Props {
  type: string;
  desc: string;
  amount: string;
  date: string;
}

const Transaction = ({ type, desc, amount, date }: Props) => {
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
        <p className="desc">{desc}</p>
        <p className="date">{date}</p>
      </div>
      {type === "credit" ? (
        <Typography color="green">{amount}</Typography>
      ) : (
        <Typography color="red">{amount}</Typography>
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
