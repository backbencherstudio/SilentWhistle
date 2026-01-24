export const amountFormated = (amount: string) => {
  if (amount >= "1000") {
    const amountInK = (parseFloat(amount) / 1000).toFixed(1);
    return amountInK + "K";
  }
  if (amount >= "1000000") {
    const amountInM = (parseFloat(amount) / 1000000).toFixed(1);
    return amountInM + "M";
  }
  if (amount >= "1000000000") {
    const amountInB = (parseFloat(amount) / 1000000000).toFixed(1);
    return amountInB + "B";
  }
  return amount;
};
