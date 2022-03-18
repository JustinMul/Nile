// Register route - Jack v1.0
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const database = require('../HelperFunctions/getUserEmail.js');

module.exports = (db) => {

  router.get("/register", (req, res) => {
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    if (req.session.user_id === undefined) {
      database.getName(accountEmail).then((value) => {
        const templateVars = {value, is_admin};
        res.render("register", templateVars);
      });
    } else {
      res.redirect('/');
    }
  });

  router.post("/register", (req, res) => {
    const temVar = req.body;
    const name = temVar.userName;
    const email = temVar.email;
    const password = temVar.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const isAdmin = temVar.isAdmin;

    const arr = [name, email, hashedPassword];
    if (isAdmin === "User") {
      database.getUserEmail(email) // Checks helper funciton asynchronously
        .then((value) => {
          if (value) {
          // Checks if email exist user in data base
            return res.status(403).send("<h1>400</h1><h2>Email already in use</h2>");
          } else {
            database.registerUserId(arr);
            res.redirect("/login");
          }
        });
    } else {
      database.getAdminEmail(email)
        .then((value) => {
          if (value) {
            // Checks if email exist in admin data base
            return res.status(403).send("<h1>400</h1><h2>Email already in use</h2>");
          } else {
            database.registerAdminId(arr);
            res.redirect("/login");
          }
        });
    }

  });
  return router;
};
