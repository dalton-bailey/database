const mongoose = require("mongoose");

const SkiSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number
})

module.exports = mongoose.model('Ski', SkiSchema)