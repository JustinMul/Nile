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
    db.query(`SELECT * FROM items;`)
      .then(data => {
      const tempVar = {items:data.rows, value, is_admin}
      res.render("index", tempVar,);

    });

  });

});
return router;
};






// app.get("/", (req, res) => {
//   db.query(sqlQuery)
//   .then(data => {
//     const templateVars = { items: data.rows }
//     db.query(favsQuery, [req.session.user_id])
//     .then(data => {
//       templateVars.favourites = data.rows;
//       console.log("favourites", templateVars.favourites);
//       res.render("index", templateVars);
//     })
//   })
// })
