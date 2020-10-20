const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkiSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Ski = mongoose.model("Ski", SkiSchema);

module.exports = Ski;
