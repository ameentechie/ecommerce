export const formatPrice = (price) => `₹${price.toFixed(2)}`;

export const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};
