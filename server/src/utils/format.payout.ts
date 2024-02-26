export function formatPayout(payoutResponse: any) {
  const { data, payouts } = payoutResponse;
  const res_data = data[0];
  const payout_data = payouts["0"];

  return {
    id: res_data.id,
    valueInUSD: res_data.valueInUSD,
    issuer: res_data.issuer,
    receiver: res_data.receiver,
    email: res_data.email,
    payment_date: res_data.paymentDate,
    type: res_data.type,
    fee: res_data.fee,
    issueID: res_data.issueID,
    redeemLink: res_data.redeemLink,
    status: payout_data.status
  }
}