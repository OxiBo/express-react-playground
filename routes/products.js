const express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  isLoggedIn = require("../middleware/isLoggedIn");

router.use(bodyParser.urlencoded({ extended: true }));
require("../models/Product");
const Product = mongoose.model("products");

router.get("/api/products", async (req, res) => {
  try {
    const foundProducts = await Product.find();
    res.send(foundProducts);
  } catch (err) {
    console.err(err);
    res.status(500).send("figure out what database error");
  }
});


router.get("/api/order/:productId", async (req, res) => {
  
    try {
      const foundProduct = await Product.findById(req.params.productId);
      if(foundProduct.count > 0)
      res.send(foundProduct);
      else {
          res.status(403).send('Product is not available')
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });


module.exports = router;
