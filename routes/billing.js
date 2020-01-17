const express = require("express"),
  stripe = require("stripe")(process.env.STRIPE_SECRET_KEY),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"); // do i have to require it here as well on top of requiring it in the index.js
require("../models/Order");
const User = mongoose.model("users"),
  Order = mongoose.model("orders"),
  Product = mongoose.model("products");

const router = express.Router();
router.use(bodyParser.json()); // ????

router.post("/api/stripe-payment", async (req, res) => {
  //   console.log(req.body);
  const { amount, name, token, productId, deliveryInfo } = req.body;
  //   let charge;
  //   const charge = await stripe.charges.create({
  //     amount: Math.round(amount),
  //     currency: "usd",
  //     description: `payment for ${name}`,
  //     source: token.id
  //   });
  try {
    charge = await stripe.charges.create({
      amount: Math.round(amount),
      currency: "usd",
      description: `payment for ${name}`,
      source: token.id
    });
    // console.log("CHARGE===========")
    // console.log(charge)
  } catch (error) {
    console.error(error);
    res.status(502).send({ error: "Unsuccessful charge" }); // https://kinsta.com/blog/http-status-codes/
  }
  // console.log(charge)
  try {
    if (charge.status === "succeeded") {
      // ??? do i need to have this condition check
      let newOrder = await new Order({
        total: charge.amount,
        _user: req.user.id,
        deliveryInfo
      }).save();
      newOrder.items.push(productId);
      await newOrder.save();
      await Product.findByIdAndUpdate(productId, {"$inc": {count:  -1}}); // https://stackoverflow.com/questions/48740754/how-to-subtract-from-current-field-in-mongodb-with-update-using-aggregation-pipe

      let user;
      if (req.user) {
        await req.user.orders.push(newOrder);
        await req.user.save();
        user = await User.findById(req.user.id)
          .populate({ path: "orders", model: Order, populate: {
              path: 'items',
              model: Product
          } }) //https://stackoverflow.com/questions/33072212/mongoose-error-schema-hasnt-been-registered-for-model-when-populate nested populate - //https://stackoverflow.com/questions/33072212/mongoose-error-schema-hasnt-been-registered-for-model-when-populate
          .exec();
         
        // console.log(user.orders);
      }

      res.send({ newOrder, user });
    }
  } catch (error) {
    console.log(error);
    res.status(503).send({
      error: "The server is unavailable to handle this request right now"
    });
  }
});

module.exports = router;
