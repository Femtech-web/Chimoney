export const transactions = [
  {
    id: 1,
    date: "22 feb 2024",
    type: "credit",
    amount: "$10.56",
    initiator: "oluwafemi akolade",
    bank: "uba",
    acctNo: "3423566784",
    desc: "this is a test",
  },
  {
    id: 2,
    date: "22 feb 2024",
    type: "debit",
    amount: "$10.56",
    initiator: "oluwafemi akolade",
    bank: "uba",
    acctNo: "3423566784",
    desc: "this is a test",
  },
  {
    id: 3,
    date: "22 feb 2024",
    type: "credit",
    amount: "$10.56",
    initiator: "oluwafemi akolade",
    bank: "uba",
    acctNo: "3423566784",
    desc: "this is a test",
  },
];

export const signupRequiredFields = [
  "full_name",
  "email",
  "password",
  "confirm_password",
];

export const payoutOptions = [
  {
    title: "Payout to anyone",
    name: "anyone",
  },
  {
    title: "Payout to chipay wallet",
    name: "wallet",
  },
];

export const navbarList = [
  {
    name: "Your Profile",
    url: "/profile",
  },
  {
    name: "Your Transactions",
    url: "/transactions",
  },
];
