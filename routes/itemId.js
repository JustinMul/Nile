const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');

module.exports = (db) => {
  router.get("/items/:id", (req, res) => {

    const id = req.params.id;
    req.session.itemid = id;
    const cookieItemId = req.session.itemid;
    //console.log(cookieItemId);
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    const adminEmail = req.session.adminEmail;

    //console.log('this is req.sessions', req.session)
    //console.log('this is admin emailemailemailemailemailemail', adminEmail);

    database.getName(accountEmail).then((value) => {
      //console.log("TEST NAME: ", value);
      db.query(`SELECT * FROM items WHERE id = $1`, [id])
        .then(data => {
          database.getAdminId(adminEmail).then((adminIdValue)=>{
            if (!adminIdValue) {
              adminId = null;
              const templateVars = {item: data.rows[0], value, is_admin, cookieItemId, adminId, accountEmail};
              res.render("itemid", templateVars);
            } else {
              const adminId = adminIdValue.id;

              console.log("datadatadatadatadatadatadatadatadatadata", adminId);
              const templateVars = {item: data.rows[0], value, is_admin, cookieItemId, adminId, adminEmail, accountEmail};

              res.render("itemid", templateVars);
            }
          });
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
