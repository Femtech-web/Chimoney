import { SubAcctResponseBody } from "../typings/types";

export function formatSubAccount(accountDetails: any, type: string) {
  let formatted_data: SubAcctResponseBody;

  formatted_data = {
    account_id: accountDetails.id,
    parent_id: accountDetails.parent,
    isAccountVerified: accountDetails.verified,
    createdDate: accountDetails.createdDate,
    user_name: accountDetails.name,
    user_email: accountDetails.email,
    isSubAccount: accountDetails.subAccount
  }

  if (type === "wallet") {
    formatted_data = {
      ...formatted_data,
      user_wallet: accountDetails.wallets.find((wallet: any) => wallet.type === "chi")
    }
  }

  return formatted_data;
}

