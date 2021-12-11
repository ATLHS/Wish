const mongoose = require("mongoose");

const Schema = new mongoose.Schema();

const giftSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: { type: String, unique: true },
    status: { type: String, unique: true },
    link_url: { type: String, unique: true, default: 0 },
    image: { type: String, unique: true },
  },
  { timestamps: true }
);

const Gift = mongoose.model("Gift", giftSchema);

module.exports = Gift;
