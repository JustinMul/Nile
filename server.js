// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');
const registerUserId = require('./routes/database');


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();



// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
// const registerRoute = require('./routes/registerRoute');



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// app.use("/api/registerRoute", registerRoute(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});


app.get("/item/:id", (req, res) => {
  res.render("items");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/edit", (req, res) => {
  res.render("edit");
});

app.get("/fav", (req, res) => {
  res.render("favourites");
});

// this is the page for admin to create a listing
app.get("/listings", (req, res) => {
  res.render("listing");
});

app.post("/register", (req, res) => {
  console.log('this is res', req.body);
  const temVar = req.body;
  const name = temVar.userName;
  const email = temVar.email;
  const password = temVar.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const arr = [name, email, hashedPassword];
  registerUserId(arr);
  // userName: '123', email: '123@g', password: '123'

  res.redirect("/");
});

