const express = require("express");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, (req, res) => {
  console.log("listening on port 3000");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://admin_user:HxkSk4DjUsf2pfUv@cluster0.wfrgb.mongodb.net/skis?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const Ski = require("./models/skiModel");
const Manufacture = require("./models/manufactureModel");

// Route to create a Manufacture
app.post("/manufactures", (req, res) => {
  Manufacture.create({
    name: req.query.name,
    address: req.query.address,
    phone: req.query.phone,
  })
    .then((manufacture) => {
      res.json(manufacture);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Route to get all manufactutes
app.get("/manufactures", (req, res) => {
  Manufacture.find({})
    .then((manufactures) => {
      res.json(manufactures);
    })
    .catch((err) => {
      res.json(err);
    });
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

// Route for creating a new Ski and updating Manufacture "Skis" field with it
app.post("/manufactures/:id", (req, res) => {
  Ski.create({
    name: req.query.name,
    category: req.query.category,
    price: req.query.price,
    quantity: req.query.quantity,
  })

    .then((ski) => {
      return Manufacture.updateOne(
        { _id: req.params.id },
        { $addToSet: { ski: ski._id } }
      );
    })
    .then((manufacture) => {
      res.json(manufacture);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Route for retrieving a Manufacture by id and populating it's Skis.
app.get("/manufactures/:id", (req, res) => {
  Manufacture.findById({ _id: req.params.id })
    .populate("ski")
    .then((manufacture) => {
      res.json(manufacture);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Route to get all Skis
app.get("/skis", (req, res) => {
  Ski.find({})
    .then((skis) => {
      res.json(skis);
    })
    .catch((err) => {
      res.json(err);
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

// Get ski by id
app.get("/skis/:id", (req, res) => {
  Ski.findById(req.params.id)
    .then((skis) => {
      res.json(skis);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Update ski by id
app.put("/skis/:id", (req, res) => {
  Ski.findById({ _id: req.params.id }, (err, ski) => {
    if (err) console.log(err);

    ski.update(req.query, (err, skis) => {
      if (err) console.log(err);

      Ski.find((err, skis) => {
        if (err) console.log(handleError(err));
        res.json(skis);
      });
    });
  });
});

// Update manufacture by id
app.put('/manufactures/:id', (req, res) =>{
    Manufacture.findById({ _id: req.params.id}, (err, manufacture) => {
        if (err) console.log(err)

        manufacture.update(req.query, (err, manufactures) => {
            if (err) console.log(err)

            Manufacture.find((err, manufactures) => {
                if (err) console.log(handleError(err))

                res.json(manufactures)
            })
        })
    })
})
