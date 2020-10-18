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
const Manufacture = require("./models/manufactureModel")

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

app.post("/manufactures", (req, res) => {
    Manufacture.create(
      {
        name: req.query.name,
        address: req.query.address,
        phone: req.query.phone
      },
      (err, manufactures) => {
        Manufacture.find((err, manufactures) => {
          if (err) console.log(err);
  
          res.json(manufactures);
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


app.get("/manufactures", (req, res) => {
    Manufacture.find((err, manufactures) => {
      if (err) console.log(err);
  
      res.json(manufactures);
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

app.delete("/manufactures", (req, res) => {
    Manufacture.deleteOne({ name: req.query.name }, (err, manufactures) => {
      Manufacture.find((err, manufactures) => {
        if (err) console.log(err);
  
        res.json(manufactures);
      });
    });
  });

app.put("/skis", (req, res) => {
  Ski.updateOne({ name: req.query.name }, {quantity: req.query.quantity}, (err, skis) => {
    Ski.find((err, skis) => {
      if (err) console.log(err);

      res.json(skis);
    });
  });
});



