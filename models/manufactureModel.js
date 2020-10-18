const mongoose = require("mongoose");

const ManufactureSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: Number
})

module.exports = mongoose.model('Manufactures', ManufactureSchema)