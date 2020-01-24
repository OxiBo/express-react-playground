const keys = require("../../config/keys");

module.exports = (orderId, name, amount, deliveryInfo) => {
  // console.log(process.env.REDIRECT_DOMAIN)
  return `
  <html>
     <body>
        <div style="text-align: center;">
            <h3>Your order has been placed successfully!</h3>
            <p>You ordered: <strong>${name}</strong> </p>
            <p>Paid total: <strong>$${(amount / 100).toFixed(2)}</strong></p>
            ${
              deliveryInfo
                ? `<p>Delivery info: <strong>${deliveryInfo}</strong></p>`
                : ""
            }
            <div>
            <p>
              Click the link below to confirm your order
            </p>
                <a href="${keys.redirectDomain}/api/stripe-payment/${orderId}/confirm">Confirm</a>
            </div>
        </div>
</body>
</html>
  `;
};
