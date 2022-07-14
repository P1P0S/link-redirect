const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
  clicks: { type: Number, default: 0 },
});

//(L)ink = model/collection, (l)ink = document
module.exports = mongoose.model("Link", linkSchema);
