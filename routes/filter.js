const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');


module.exports = (db) => {
  router.get("/filter", (req, res) => {
    // itemGet.getAllItems();


    //console.log("cookie session for GET TEST: ", req.session.user_id);
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    //console.log("accountemail cookie",accountEmail);
    database.getName(accountEmail).then((value) => {
      console.log("I got here");
      console.log("filter: ", value);

      db.query(`SELECT * FROM items ORDER BY id`)
        .then(data => {

          const tempVar = {items:data.rows, value, is_admin}
          res.render("filter", tempVar,);

        });

    });

  });






  router.post("/filter", (req, res) => {
    console.log("SEARCH BODY", req.body)
    const min =req.body.min;
    const max = req.body.max;

    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    console.log(req.session);
    database.getName(accountEmail).then((value) => {


      db.query(`SELECT * FROM items WHERE cost >= $1 And cost <= $2`, [min,max])
        .then(data => {
          console.log("data",data);
          const templateVars = {items: data.rows, value, is_admin};
          res.render("filter", templateVars);
          console.log(min);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
  });

 return router;
}

