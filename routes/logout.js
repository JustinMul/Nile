// Login route - Jack v1.0
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const database = require('../HelperFunctions/getUserEmail.js');


module.exports = (db) => {
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });
  return router;
};
