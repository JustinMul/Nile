const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');
const itemGet = require('../HelperFunctions/getAllItems.js');



module.exports = (db) => {
  router.get("/", (req, res) => {
    // itemGet.getAllItems();



    // console.log("cookie session for GET TEST: ", req.session.user_id);
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    // console.log("accountemail cookie",accountEmail);
    database.getName(accountEmail).then((value) => {
      // console.log("TEST NAME: ", value);

      db.query(`SELECT * FROM items ORDER BY id;`)
        .then(data => {
          const tempVar = {items:data.rows, value, is_admin};
          res.render("index", tempVar);

        });

    });

  });
  return router;
};

