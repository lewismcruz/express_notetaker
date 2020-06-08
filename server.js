// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Customers (DATA)
// =============================================================
var customers = [
  {
    ID: "Ahmed",
    Name: "afhaque89@gmail.com",
    Email: "afhaque89",
    phoneNumber: "979-587-0887"
  },
  
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});



// Check API for correct URL format /// endpoints

// Displays all Customers
app.get("/api/Customers", function(req, res) {
  return res.json(Customers);
});

// Displays a single Customer, or returns false
app.get("/api/Customers/:Customer", function(req, res) {
  var chosen = req.params.Customer;

  console.log(chosen);

  for (var i = 0; i < Customers.length; i++) {
    if (chosen === Customers[i].routeName) {
      return res.json(Customers[i]);
    }
  }

  return res.json(false);
});

// Create New Customers - takes in JSON input
app.post("/api/Customers", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCustomer = req.body;

  // Using a RegEx Pattern to remove spaces from newCustomer
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCustomer.routeName = newCustomer.name.replace(/\s+/g, "").toLowerCase();

  console.log(newCustomer);

  Customers.push(newCustomer);

  res.json(newCustomer);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


