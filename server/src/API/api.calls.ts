import CHIPAY_API from "./axios.setup";

// name
// email
export const CREATE_SUBACCOUNT_API = async (payload: any) => {
  try {
    const res = await CHIPAY_API.post("/sub-account/create", payload);

    if (res) {
      return res
    }
  } catch (err) {
    console.log(err)
  }
}

export const GET_SUBACCOUNT_API = async (account_id: string) => {
  try {
    const res = await CHIPAY_API.get(`/sub-account/get?id=${account_id}`);

    if (res) {
      return res
    }
  } catch (err) {
    console.log(err)
  }
}

export const PAYOUT_CHIMONEY_API = async (payload: any) => {
  try {
    const res = await CHIPAY_API.post("/payouts/chimoney", payload);

    if (res) {
      return res
    }
  } catch (err) {
    console.log(err)
  }
}

export const PAYOUT_WALLET_API = async (payload: any) => {
  try {
    const res = await CHIPAY_API.post("/payouts/wallet", payload);

    if (res) {
      return res
    }
  } catch (err) {
    console.log(err)
  }
}