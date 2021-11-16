const mongoose = require("mongoose");

const Schema = new mongoose.Schema();

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    status: { type: String, unique: true, default: "pending" },
    confirmed_code: { type: Number, unique: true, default: 0 },
    password: { type: String, unique: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
