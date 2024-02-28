"use client";

import React from "react";
import { styled } from "@mui/material";
import { useAppContext, useAuthContext } from "@/context";
import {
  TransactionCustomBox,
  TransactionCustomPaper,
  TransactionWrapper,
} from "@/helpers/CustomStyles";

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
  const { user } = useAuthContext();
  const { userWallet } = useAppContext();

  return (
    <TransactionWrapper maxWidth="sm">
      <h2>Profile</h2>
      <ProfilePaper>
        <ProfileBar header="Name" subtext={userWallet.user_name} />
        <ProfileBar header="Email" subtext={user.email} />
        <ProfileBar header="Chimoney ID" subtext={userWallet.account_id} />
      </ProfilePaper>
    </TransactionWrapper>
  );
};

export default ProfilePage;

const ProfilePaper = styled(TransactionCustomPaper)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileBox = styled(TransactionCustomBox)`
  border: 1px solid #ebecf2;
  padding: 1rem;
  border-radius: 5px;

  p {
    font-size: 1rem;
    color: black;
  }
`;
