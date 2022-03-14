const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("cookie session for GET TEST: ", req.session.user_id);
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    console.log("accountemail cookie",accountEmail);
    database.getName(accountEmail).then((value) => {
      console.log("TEST NAME: ", value);
      const templateVars = {value, is_admin};
      res.render("index", templateVars);
    });
  });
  return router;
};
