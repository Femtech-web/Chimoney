"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import {
  Container,
  Box,
  styled,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { transactions } from "@/components/dummy";
import { List } from "@/components/Transactions";
import Transaction from "@/components/Transaction";
import { CustomBox as LoaderBox } from "@/components/Loader";

const TransactionsPage = () => {
  const [rangeSelector, setRangeSelector] = useState<boolean>(false);

  return (
    <Container maxWidth="sm">
      <Box>
        {transactions && transactions.length !== 0 ? (
          <CustomBox>
            <div className="header">
              <h2>Last 20 Transactions</h2>
              <span onClick={() => setRangeSelector(true)}>
                <CiCalendar
                  fontSize={25}
                  style={{ cursor: "pointer" }}
                  color="black"
                />
              </span>
            </div>
            <List>
              {transactions.map((transaction, index) => (
                <CustomLink
                  key={index}
                  href={`/transactions/${transaction.id}`}
                >
                  <Transaction {...transaction} />
                </CustomLink>
              ))}
            </List>
          </CustomBox>
        ) : (
          <Container>
            <p>No transaction yet</p>
          </Container>
        )}
      </Box>
      {rangeSelector && (
        <RangeBox>
          <span onClick={() => setRangeSelector(false)}>
            <AiOutlineClose fontSize={25} color="white" />
          </span>
          <CustomPaper>
            <div className="btn_wrapper">
              <TextField type="date" helperText="From date" size="small" />
              <TextField type="date" helperText="to date" size="small" />
            </div>
            <div className="btn_two">
              <Button variant="contained" color="secondary">
                Apply
              </Button>
            </div>
          </CustomPaper>
        </RangeBox>
      )}
    </Container>
  );
};

export default TransactionsPage;

const CustomBox = styled(Box)`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0 2rem 0;

    h2 {
      font-weight: 400;
      font-style: normal;
      font-size: 1.5rem;
    }
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
`;

const RangeBox = styled(LoaderBox)`
  background-color: rgba(0, 0, 0, 0.5);

  span {
    position: absolute;
    right: 1.5rem;
    top: 1rem;
    cursor: pointer;
  }
`;

const CustomPaper = styled(Paper)`
  position: relative;
  min-width: 200px;
  min-height: 150px;
  border-radius: 5px;
  padding: 2rem 1rem 1rem;

  .btn_wrapper {
    display: flex;
    gap: 1rem;
  }

  .btn_two {
    width: 100%;
    text-align: center;
  }
`;
