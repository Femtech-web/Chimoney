export function formatTransaction(transaction: any) {
  return {
    id: transaction.id,
    amount: transaction.valueInUSD,
    issueID: transaction.issueID,
    type: transaction.type,
    receiver: transaction.receiver,
    issuer: transaction.issuer,
    paymentDate: transaction.paymentDate,
    redeemDate: transaction.redeemDate,
    currency: transaction.currency,
    deliveryStatus: transaction.deliveryStatus,
    status: transaction.status,
  };
}
