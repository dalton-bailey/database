const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://admin_user:HxkSk4DjUsf2pfUv@cluster0.wfrgb.mongodb.net/skis?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.listen(port, () => {
  console.log("Server running on port 3000");
});

const Ski = require("./models/skiModel");

app.post("/skis", (req, res) => {
  Ski.create(
    {
      name: req.query.name,
      category: req.query.category,
      price: req.query.price,
      quantity: req.query.quantity,
    },
    (err, skis) => {
      Ski.find((err, skis) => {
        if (err) console.log(err);

        res.json(skis);
      });
    }
  );
});

app.get("/skis", (req, res) => {
  Ski.find((err, skis) => {
    if (err) console.log(err);

    res.json(skis);
  });
});

app.delete("/skis", (req, res) => {
  Ski.deleteOne({ name: req.query.name }, (err, skis) => {
    Ski.find((err, skis) => {
      if (err) console.log(err);

      res.json(skis);
    });
  });
});

app.put("/skis", (req, res) => {
    

})
