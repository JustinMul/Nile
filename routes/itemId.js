const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');

module.exports = (db) => {
  router.get("/items/:id", (req, res) => {

    const id = req.params.id;
    req.session.itemid = id;
    const cookieItemId = req.session.itemid;
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    const adminEmail = req.session.adminEmail;
    database.getName(accountEmail).then((value) => {
      db.query(`SELECT * FROM items WHERE id = $1`, [id])
        .then(data => {
          database.getAdminId(adminEmail).then((adminIdValue)=>{
            if (!adminIdValue) {
              adminId = null;
              const templateVars = {item: data.rows[0], value, is_admin, cookieItemId, adminId, accountEmail};
              res.render("itemid", templateVars);
            } else {
              const adminId = adminIdValue.id;
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
