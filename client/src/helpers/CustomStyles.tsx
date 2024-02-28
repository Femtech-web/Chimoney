import { Box, Paper, Container, Button, styled } from "@mui/material";

// ------------------- Signup and Form styles ------------
export const CustomButton = styled(Button)`
  font-family: "Poppins", sans-serif;
  text-transform: none;
  font-size: 1.3rem;
`;

export const CustomContainer = styled(Container)`
  min-height: 100vh;
  padding: 7% 0;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .btm_text {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    gap: 0.5rem;

    a {
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: blue;
      }
    }
  }
`;

// ----------------------- Transaction Page Styles -----------------
export const TransactionWrapper = styled(Container)`
  h2 {
    font-weight: 400;
    font-style: normal;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

export const TransactionCustomPaper = styled(Paper)`
  min-width: 300px;
  min-height: 250px;
  padding: 1rem;
  border-radius: 5px;
`;

export const TransactionCustomBox = styled(Box)`
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
