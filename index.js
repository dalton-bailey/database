const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const port = proces.env.PORT || 3000;

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
const Manufacture = require("./models/manufactureModel");


// Route to get all manufactutes
app.get("/manufactures", (req,res) => {
  Manufacture.find({})
  .then(function(manufactures) {
    res.json(manufactures);
  })
  .catch(function(err) {
    res.json(err);
  })
});

// Route to get all Skis
app.get("/skis", function(req,res) {
  Ski.find({})
  .then(function(skis) {
    res.json(skis);
  })
  .catch(function(err) {
    res.json(err);
  })
});

// Route to delete a Manufacture
app.delete("/manufactures", (req, res) => {
  Manufacture.deleteOne({ name: req.query.name }, (err, manufactures) => {
    Manufacture.find((err, manufactures) => {
      if (err) console.log(err);

      res.json(manufactures);
    });
  });
});

// Route to delete a Ski
app.delete("/skis", (req, res) => {
  Ski.deleteOne({ name: req.query.name }, (err, skis) => {
    Ski.find((err, skis) => {
      if (err) console.log(err);

      res.json(skis);
    });
  });
});


// Route to create a Manufacture
app.post("/manufactures", (req, res) => {
  Manufacture.create({
  name: req.query.name,
  address: req.query.address,
  phone: req.query.phone
  })
    .then(function(manufacture) {
      res.json(manufacture);
    })
    .catch(function(err) {
      res.json(err);
    });
});


// Route for creating a new Ski and updating Manufacture "Ski" field with it
app.post("/manufactures/:name", function(req, res) {
  Ski.create({
    name: req.query.name,
    category: req.query.category,
    price: req.query.price,
    quantity: req.query.quantity
  })
    .then(function(ski) {
      return Manufacture.findOneAndUpdate({ name: req.params.name }, { ski: ski._id }, { new: true });
    })
    .then(function(manufacture) {
      res.json(manufacture);
    })
    .catch(function(err) {
      res.json(err);
    });
});


// Route for retrieving a Manufacture by id and populating it's Ski.
app.get("/manufactures/:name", function(req, res) {
  Manufacture.findOne({ name: req.params.name })
    .populate("ski")
    .then(function(manufacture) {
      res.json(manufacture);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Get ski by id
app.get("/skis/:id", (req, res) => {
  Ski.findOne({ _id: req.params.id })
  .then(function(skis) {
    res.json(skis);
  })
  .catch(function(err) {
    res.json(err);
  })
})

// Update ski name and quantity 
app.put("/skis", (req, res) => {
    Ski.updateOne(
    { name: req.query.name },
    { quantity: req.query.quantity },
    (err, skis) => {
      Ski.find((err, skis) => {
        if (err) console.log(err);

        res.json(skis);
      });
    }
  );
});


