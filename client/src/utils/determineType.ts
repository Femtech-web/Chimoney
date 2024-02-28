export function determineType(amount: any) {
  const value = amount.toString().split("");

  if (value[0] === "-") {
    return "debit";
  } else {
    return "credit";
  }
}
