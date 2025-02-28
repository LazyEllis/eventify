const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatCurrency = (amount) => {
  return currencyFormatter.format(amount);
};

export const formatDate = (date) => {
  return date ? new Date(date).toISOString().slice(0, 16) : "";
};
