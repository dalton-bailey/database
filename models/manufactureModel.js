const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ManufactureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  ski: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ski",
    },
  ],
});

const Manufacture = mongoose.model("Manufacture", ManufactureSchema);

module.exports = Manufacture;
