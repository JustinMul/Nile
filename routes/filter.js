const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');


module.exports = (db) => {
  router.get("/filter", (req, res) => {
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    database.getName(accountEmail).then((value) => {
      db.query(`SELECT * FROM items ORDER BY id`)
        .then(data => {
          const tempVar = {items:data.rows, value, is_admin}
          res.render("filter", tempVar,);
        });
    });
  });
  router.post("/filter", (req, res) => {
    const min = req.body.min;
    const max = req.body.max;
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    database.getName(accountEmail).then((value) => {
      db.query(`SELECT * FROM items WHERE cost >= $1 And cost <= $2`, [min,max])
        .then(data => {
          const templateVars = {items: data.rows, value, is_admin};
          res.render("filter", templateVars);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
  });

  return router;
};
