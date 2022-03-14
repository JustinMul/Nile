const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const accountEmail = req.session.user_id;
    console.log("accountemail cookie",accountEmail);
    database.getName(accountEmail).then((value) => {
      console.log("TEST NAME: ", value);
      const templateVars = {value};
      res.render("index", templateVars);
    });
  });
  return router;
};
