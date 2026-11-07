// Nepal-based shop — format prices in Nepalese Rupees (NPR)
export const formatPrice = (value) =>
  `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;
