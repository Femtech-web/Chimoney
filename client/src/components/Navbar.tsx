"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Avatar,
  Paper,
  ListItem,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import { useOutsideClick } from "@/hooks/outside.click";
import { navbarList } from "./dummy";
import { useAuthContext, useAppContext } from "@/context";

const Navbar = () => {
  const { handleSignout } = useAuthContext();
  const { userWallet } = useAppContext();
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const handleClose = () => setIsProfileOpen((prev) => !prev);
  const handleOutside = () => setIsProfileOpen(false);
  const ref = useOutsideClick(handleOutside);
  const userName = userWallet?.user_name.split(" ");

  const handleLogout = () => {
    setIsProfileOpen(false);
    handleSignout();
  };

  return (
    <CustomBox component="section" ref={ref}>
      <div className="logo_container">
        <Link href="/dashboard">
          <Image
            src="/logo-black.png"
            alt="company logo"
            width={90}
            height={25}
          />
        </Link>
      </div>
      <div className="name_wrapper" onClick={handleClose}>
        <Avatar sx={{ bgcolor: "#000" }}>
          {userName.length >= 2
            ? `${userName[0].charAtName[1].charAt(0)}`
            : userName[0].charAt(0)}
        </Avatar>
        <span>
          <Image
            src="/Arrow-Down.svg"
            alt="arrow_down-icon"
            width={30}
            height={20}
          />
        </span>
      </div>
      {isProfileOpen && (
        <NavBox elevation={3}>
          <List>
            {navbarList.map((list, index) => (
              <ListItem
                disablePadding
                key={index}
                onClick={() => setIsProfileOpen(false)}
              >
                <ListItemButton component="a" href={list.url}>
                  <ListItemText primary={list.name} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton component="a" href="#">
                <ListItemText primary="Sign out" />
              </ListItemButton>
            </ListItem>
          </List>
        </NavBox>
      )}
    </CustomBox>
  );
};

export default Navbar;

/* --------------------------- styles ---------------------------- */
const CustomBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  border-bottom: 1px solid #ebecf2;
  margin-bottom: 2rem;

  .name_wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid #ebecf2;
    border-radius: 50px;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 100ms linear;

    &:hover {
      opacity: 0.8;
      box-shadow: 0 0 2px 1px gray;
    }
  }

  @media (max-width: 640px) {
    padding: 10px 1rem;
  }
`;

const NavBox = styled(Paper)`
  position: absolute;
  top: 4.5rem;
  right: 1rem;
  width: 250px;
  height: 200px;
  padding: 1rem;
  border-radius: 5px;
`;

/* --------------------------- styles ---------------------------- */
