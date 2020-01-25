const express = require("express"),
  keys = require("../config/keys"),
  stripe = require("stripe")(keys.stripeSecretKey),
  mongoose = require("mongoose"),
  Mailer = require("../services/Mailer"),
  orderTemplate = require("../services/emailTemplates/orderTemplate"),
  bodyParser = require("body-parser"),
  // to parse url for tracking open and click event
  { Path } = require("path-parser"),
  // Path = require("path-parser").default,
  { URL } = require("url"); // do i have to require it here as well on top of requiring it in the index.js
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
    // console.log(charge);
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
        _user: req.user ? req.user.id : undefined,
        deliveryInfo
      }); // deleted .save()
      newOrder.items.push(productId);

      // subtract one product from our database/warehouse
      await Product.findByIdAndUpdate(productId, { $inc: { count: -1 } }); // https://stackoverflow.com/questions/48740754/how-to-subtract-from-current-field-in-mongodb-with-update-using-aggregation-pipe

      await newOrder.save();

      try {
        // send email about the order
        const recipient = { email: charge.billing_details.name };

        const mailer = new Mailer(
          { subject: `Your order of ${name}`, recipients: [recipient] },
          orderTemplate(newOrder.id, name, amount, deliveryInfo)
        );
        await mailer.send();
      } catch (error) {
        console.log(error);
      }

      // let user;
      if (req.user) {
        await req.user.orders.push(newOrder);
        await req.user.save();
        // user = await User.findById(req.user.id)
        //   .populate({
        //     path: "orders",
        //     model: Order,
        //     populate: {
        //       path: "items",
        //       model: Product
        //     }
        //   }) //https://stackoverflow.com/questions/33072212/mongoose-error-schema-hasnt-been-registered-for-model-when-populate nested populate - //https://stackoverflow.com/questions/33072212/mongoose-error-schema-hasnt-been-registered-for-model-when-populate
        //   .exec();
        // // console.log(user.orders);
        // // should I do this instead??  res.send({ newOrder, user });
        // res.send({ newOrder, user }); // should i do - res.send({ newOrder }) if i do res.send({ newOrder, user }); above?
      }

      res.send({ newOrder });
    }
  } catch (error) {
    console.log(error);
    res.status(503).send({
      error: "The server is unavailable to handle this request right now"
    });
  }
});

// not finished
router.get("/api/stripe-payment/:orderId/confirm", (req, res) => {
  res.send("Thanks for your feedback!!!");
});

router.post("/api/order/webhooks", (req, res) => {
  try {
    const p = new Path("/api/stripe-payment/:orderId/confirm");

    const newArr = req.body.map(({ url }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return { orderId: match.orderId };
      }
    });
    // console.log(newArr);
    newArr.forEach(async ({ orderId }) => {
      console.log(orderId);
      const updatedOrder = await Order.updateOne(
        { _id: orderId, confirmed: false },
        { $set: { confirmed: true }, confirmedAt: new Date() }
      ).exec();
      // console.log(updatedOrder);
    });

    //     _.chain(req.body)
    //       .map(({ email, url }) => {
    //         const match = p.test(new URL(url).pathname);
    //         if (match) {
    //           return { email, surveyId: match.surveyId, choice: match.choice };
    //         }
    //       })
    //       .compact()
    //       .uniqBy("email", "surveyId")
    //       .each(({ surveyId, email, choice }) => {
    //         Survey.updateOne(
    //           {
    //             _id: surveyId,
    //             recipients: {
    //               $elemMatch: { email: email, responded: false }
    //             }
    //           },
    //           {
    //             $inc: { [choice]: 1 },
    //             $set: { "recipients.$.responded": true },
    //             lastResponded: new Date()
    //           }
    //         ).exec();
    //       })
    //       .value();
    //     // console.log(events);
    //     res.send({});

    //     /*

    //      const events = _.map(req.body, ({ email, url }) => {
    //       const pathname = new URL(url).pathname;

    //       const p = new Path("/api/surveys/:surveyId/:choice");
    //       const match = p.test(pathname);

    //       if (match) {
    //         return { email, surveyId: match.surveyId, choice: match.choice };
    //       }
    //     });

    //     // console.log(events);
    //     const compactEvents = _.compact(events);
    //     const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");

    //     */

    res.send({});
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
