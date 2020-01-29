const reviewNewFormFields = [
  { label: "Product Name", name: "productName", type: "text" },
  { label: "Product Url", name: "productUrl", type: "text" },
  { label: "Price", name: "price", type: "text" },
  { label: "Contact Name", name: "name", type: "text" },
  { label: "Contact Profile Url", name: "profileUrl", type: "text" },
  { label: "Contact Email", name: "email", type: "text" },
  { label: "Order Date", name: "orderDate", type: "date" }
];

const reviewEditFormFields = [
  { label: "Review submit date", name: "reviewSubmitDate", type: "date" },
  { label: "Review Url", name: "reviewUrl", type: "text" },
  { label: "Refund Date", name: "refundDate", type: "date" }
];

export { reviewNewFormFields, reviewEditFormFields };
