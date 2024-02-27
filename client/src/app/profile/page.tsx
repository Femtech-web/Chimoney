"use client";

import React from "react";
import {
  Wrapper,
  CustomPaper,
  CustomBox,
} from "../transactions/[transactionId]/page";
import { styled } from "@mui/material";
import { useAppContext } from "@/context";
import { getEncryptedData } from "@/utils/encryptData";

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
  const { user, userWallet } = useAppContext();
  const storedUserName: any = getEncryptedData("chipay-userName");

  return (
    <Wrapper maxWidth="sm">
      <h2>Profile</h2>
      <ProfilePaper>
        <ProfileBar header="Name" subtext={storedUserName} />
        <ProfileBar header="Email" subtext={user.email} />
        <ProfileBar header="Chimoney ID" subtext={userWallet.account_id} />
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
