import { SubAcctResponseBody } from "../../typings/types";

export function formatSubAccount(accountDetails: any) {
  let formatted_data: SubAcctResponseBody;

  formatted_data = {
    account_id: accountDetails.id,
    parent_id: accountDetails.parent,
    isAccountVerified: accountDetails.verified,
    createdDate: accountDetails.createdDate,
    user_name: accountDetails.name,
    user_email: accountDetails.email,
    isSubAccount: accountDetails.subAccount,
  };

  return formatted_data;
}

export function formatWallet(wallets: any) {
  return wallets.find((wallet: any) => wallet.type === "chi");
}
