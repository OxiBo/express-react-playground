const mongoose = require("mongoose");
  bcrypt = require("bcrypt"); // https://medium.com/@adamlehrer/get-your-passport-through-security-with-passport-js-bcrypt-c44f70ac7159
const { Schema } = mongoose;

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
  createdAt: { type: Date, default: Date.now()},
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
  }
});

// generating a hash
userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  // console.log(this)
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("users", userSchema);
