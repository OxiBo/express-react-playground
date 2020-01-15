const mongoose = require("mongoose");

const { Schema } = mongoose;

//https://hashnode.com/post/how-to-store-image-into-mongodb-using-nodejs-ciywexzlx000117539emkvcck

const productSchema = new Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  ingredients: [String],
  imageURL: String, // considered but did not do it like that https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
  count: Number
});

module.exports = mongoose.model("products", productSchema);
