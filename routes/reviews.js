const express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  isLoggedIn = require("../middleware/isLoggedIn");

router.use(bodyParser.urlencoded({ extended: true }));
require("../models/Product");
const Review = mongoose.model("reviews");

router.get("/api/reviews", isLoggedIn, async (req, res) => {
  try {
    const reviews = await Review.find({ _user: req.user.id });
    res.send(reviews);
    // console.log(reviews)
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/api/reviews", isLoggedIn, async (req, res) => {
  console.log(req.body);
  const {
    productName,
    productUrl,
    price,
    name,
    profileUrl,
    email,
    orderDate
  } = req.body;
  try {
    let newReview = await new Review({
      productName,
      productUrl,
      price,
      contact: { name, profileUrl, email },
      orderDate,
      _user: req.user.id
    });
    newReview.save();

    await req.user.reviews.push(newReview);
    await req.user.save();

    res.send({ reviews: "review submitted" });
  } catch (error) {
    console.error(error);
    res.status(422).send({
      error: "The server is unavailable add new review form"
    });
  }
});

router.get("/api/reviews/:reviewId", isLoggedIn, async (req, res) => {
  try {
    const foundReview = await Review.findById(req.params.reviewId);
    console.log(foundReview)
    res.send(foundReview);
    // console.log(reviews)
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.patch("/api/reviews/:reviewId/edit", isLoggedIn, async (req, res) => {
  // console.log(req.body);
  const {
    productName,
    productUrl,
    price,
    name,
    profileUrl,
    email,
    orderDate,
    reviewSubmitDate,
    reviewUrl,
    refundDate
  } = req.body;

  try {
    await Review.findByIdAndUpdate(req.params.reviewId, {
      productName,
      productUrl,
      price,
      contact: { name, profileUrl, email },
      orderDate,
      reviewSubmitDate,
      reviewUrl,
      refundDate
    });
    res.send({});
    // console.log(reviews)
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
