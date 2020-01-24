const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewSchema = new Schema({
  productName: String,
  productUrl: String,
  price: Number,
  contact: { name: String, profileUrl: String, email: String },
  orderDate: Date,
  reviewSubmitDate: Date,
  reviewUrl: String,
  refundDate: Date,
  createdAt: { type: Date, default: new Date}, 
  _user:  { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("reviews", reviewSchema);
