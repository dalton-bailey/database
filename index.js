const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin_user:HxkSk4DjUsf2pfUv@cluster0.wfrgb.mongodb.net/skis?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

app.listen(port, () => {
 console.log("Server running on port 3000");
});

const Ski = require('./models/skiModel')