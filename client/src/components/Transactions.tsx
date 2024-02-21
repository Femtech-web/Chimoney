"use client";

import React from "react";
import Link from "next/link";
import { Container, Box, styled } from "@mui/material";
import { transactions } from "./dummy";
import Transaction from "./Transaction";

const Transactions = () => {
  return (
    <Wrapper maxWidth="sm">
      <div className="transaction_wrapper">
        {transactions && transactions.length !== 0 ? (
          <Box>
            <div className="header">
              <h2>Transactions</h2>
              <CustomLink href="/transactions">view all</CustomLink>
            </div>
            <List>
              {transactions.map((transaction, index) => (
                <Transaction key={index} {...transaction} />
              ))}
            </List>
          </Box>
        ) : (
          <Container>
            <p>No transaction yet</p>
          </Container>
        )}
      </div>
    </Wrapper>
  );
};

export default Transactions;

const Wrapper = styled(Container)`
  min-height: 30vh;

  .transaction_wrapper {
    padding: 2rem 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;

    h2 {
      font-weight: 400;
      font-style: normal;
      font-size: 1.5rem;
    }
  }
`;

const CustomLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: blue;
  }
`;

export const List = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
