const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');

module.exports = (db) => {
  router.get("/items/:itemid", (req, res) => {

    const itemId = req.params.itemid;
    req.session.itemid = itemId;
    const cookieItemId = req.session.itemid;
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;

    database.getName(accountEmail).then((value) => {
      console.log("TEST NAME: ", value);
      db.query(`SELECT * FROM items WHERE id = $1`, [itemId])
        .then(data => {
          const templateVars = {item: data.rows[0], value, is_admin};
          res.render("itemid", templateVars);
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
