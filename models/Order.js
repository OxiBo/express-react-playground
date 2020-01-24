const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  total: Number,
  deliveryInfo: Object,
  items: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: new Date },
//   count: {type: Number, default: 1},
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  email: String,
  confirmed: { type: Boolean, default: false },
  confirmedAt:  Date
});

module.exports = mongoose.model("orders", orderSchema);
