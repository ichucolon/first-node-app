const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userType: String,
  username: String,
  name: String,
  email: String,
  password: String,
  language: String,
  country: String,
});

const User = mongoose.model("user", UserSchema, "user");

module.exports = User;
