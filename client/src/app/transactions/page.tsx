"use client";

import React from "react";
import { Container, Box, styled } from "@mui/material";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import { transactions } from "@/components/dummy";
import { List } from "@/components/Transactions";
import Transaction from "@/components/Transaction";

const TransactionsPage = () => {
  return (
    <Container maxWidth="sm">
      <Box>
        {transactions && transactions.length !== 0 ? (
          <CustomBox>
            <div className="header">
              <h2>Last 20 Transactions</h2>
              <span>
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
