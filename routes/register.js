const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const {getUserEmail, registerUserId} = require('../HelperFunctions/getUserEmail.js');

module.exports = (db) => {

  router.get("/register", (req, res) => {
    res.render("register");
  });

  // -------------------------------------------------------------------------------------------------------------
  router.post("/register", (req, res) => {
    console.log('this is res', req.body);
    const temVar = req.body;
    const name = temVar.userName;
    const email = temVar.email;
    const password = temVar.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const isAdmin = temVar.isAdmin;
    const arr = [name, email, hashedPassword, isAdmin];

    getUserEmail(arr) // Checks helper funciton asynchronously
      .then((value) => {
        if (value) {
          // Checks if email exist in data base
          return res.status(403).send("<h1>400</h1><h2>Email already in use</h2>");
        } else {
          console.log('getUserEmail: ', getUserEmail(arr));
          registerUserId(arr);
          res.redirect("/");
        }
      });
  });
  // -------------------------------------------------------------------------------------------------------------
  return router;
};
