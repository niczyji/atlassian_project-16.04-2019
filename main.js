var express = require("express");
var mongoose = require("mongoose");
var app = express();
var database = require("./config/database");
var bodyParser = require("body-parser"); // pull information from HTML POST (express4)
var methodOverride = require("method-override");

var port = process.env.PORT || 8888;
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
app.use(methodOverride());

var Users = require("./models/Profile");

mongoose.connect(database.url, { useNewUrlParser: true });

app.get("/profile", function(req, res) {
  // use mongoose to get all todos in the database
  Users.find(function(err, users) {
    console.log(users);
    // if there is an error retrieving, send the error otherwise send data
    if (err) res.send(err);
    res.json(users); // return all users in JSON format
  });
});

// get a users with ID of 1
app.get("/profile/:user_id", function(req, res) {
  let id = req.params.users_id;
  Users.findById(id, function(err, users) {
    if (err) res.send(err);

    res.json(users);
  });
});

// create user and send back all users after creation
app.post("/profile/create", function(req, res) {
  // create mongose method to create a new record into collection
  Users.create(
    {
      name: req.body.name,
      salary: req.body.salary,
      age: req.body.age
    },
    function(err, users) {
      if (err) res.send(err);

      // get and return all the users after newly created user record
      Users.find(function(err, users) {
        if (err) res.send(err);
        res.json(users);
      });
    }
  );
});

// create employee and send back all employees after creation
app.put("/profile/:user_id", function(req, res) {
  // create mongose method to update a existing record into collection
  let id = req.params.user_id;
  var data = {
    name: req.body.name,
    salary: req.body.salary,
    age: req.body.age
  };

  // save the user
  Users.findByIdAndUpdate(id, data, function(err, user) {
    if (err) throw err;

    res.send("Successfully! User updated - " + user.name);
  });
});

// delete a employee by id
app.delete("/profile/:user_id", function(req, res) {
  console.log(req.params.user_id);
  let id = req.params.user_id;
  User.remove(
    {
      _id: id
    },
    function(err) {
      if (err) res.send(err);
      else res.send("Successfully! User has been Deleted.");
    }
  );
});

app.listen(port);
console.log("App listening on port : " + port);
