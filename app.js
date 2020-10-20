const express = require("express");
const app = express();

const manufactureRoute = require("./routes/manufactures");

app.use("/manufactures", manufactureRoute);

module.exports = app;
