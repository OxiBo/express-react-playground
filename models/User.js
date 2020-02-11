const mongoose = require("mongoose");
bcrypt = require("bcrypt"); // https://medium.com/@adamlehrer/get-your-passport-through-security-with-passport-js-bcrypt-c44f70ac7159
const { Schema } = mongoose;
// require("./Order");
// const Order = mongoose.model("orders");
const userSchema = new Schema({
  local: {
    username: String,
    password: String
  },
  google: {
    id: String,
    email: String,
    name: String,
    token: String
  },
  facebook: {
    id: String,
    email: String,
    name: String,
    token: String
  },
  createdAt: { type: Date, default: Date.now() },
  bio: {
    email: { type: String, default: "Not specified" },
    avatar: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1534944845791-f9e35a201bf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    },
    occupation: { type: String, default: "Not specified" },
    age: { type: String, default: "Not specified" },
    gender: { type: String, default: "Not specified" }
  },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }], 
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }], 
});

// generating a hash
userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  // console.log(this)
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("users", userSchema);


// other encrypting library
/*
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// user instance hook, run this function before saving a model
userSchema.pre("save", async function(next) {
  // do not use arrow function here
  const user = this; // get access to the user model
  try {
    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash (encrypt) password using the salt
    const hash = await bcrypt.hash(user.password, salt);

    // override plain text password with encrypted password
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

// Create the model class
const ModelClass = mongoose.model("user", userSchema);

// Export the model
module.exports = ModelClass;




*/