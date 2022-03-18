const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    database.getName(accountEmail).then((value) => {
      db.query(`SELECT * FROM items ORDER BY id DESC;`)
        .then(data => {
          const tempVar = {items:data.rows, value, is_admin};
          res.render("index", tempVar);
        });
    });
  });
  return router;
};

