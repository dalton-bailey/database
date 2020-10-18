const mongoose = require("mongoose");

const SkiSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    quantity: Number,
    id: Number
})

module.exports = mongoose.model('Skis', SkiSchema)