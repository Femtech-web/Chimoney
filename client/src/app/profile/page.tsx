"use client";

import React from "react";
import {
  Wrapper,
  CustomPaper,
  CustomBox,
} from "../transactions/[transactionId]/page";
import { styled } from "@mui/material";

const ProfileBar = ({
  header,
  subtext,
}: {
  header: string;
  subtext: string | undefined;
}) => {
  return (
    <ProfileBox>
      <h3>{header}</h3>
      <p>{subtext}</p>
    </ProfileBox>
  );
};
const ProfilePage = () => {
  return (
    <Wrapper maxWidth="sm">
      <h2>Profile</h2>
      <ProfilePaper>
        <ProfileBar header="Name" subtext="Akolade Oluwafemi" />
        <ProfileBar header="Email" subtext="bossfemzy10@gmail.com" />
        <ProfileBar header="Account Number" subtext="6574849428" />
      </ProfilePaper>
    </Wrapper>
  );
};

export default ProfilePage;

const ProfilePaper = styled(CustomPaper)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileBox = styled(CustomBox)`
  border: 1px solid #ebecf2;
  padding: 1rem;
  border-radius: 5px;

  p {
    font-size: 1rem;
    color: black;
  }
`;
