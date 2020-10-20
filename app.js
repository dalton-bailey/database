const express = require("express");
const app = express();

const manufactureRoute = require("./routes/manufactures");
const skisRoute = require("./routes/skis");

app.use("/manufactures", manufactureRoute);
app.use("/skis", skisRoute);

module.exports = app;
