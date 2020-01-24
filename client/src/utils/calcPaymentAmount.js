export default (amount, tax = 8) => {
  const taxes = amount * (tax / 100);
  return {
    amount: (amount / 100).toFixed(2),
    taxes: (taxes / 100).toFixed(2),
    total: ((taxes + amount) / 100).toFixed(2)
  };
};
