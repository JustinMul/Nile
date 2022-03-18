const express = require('express');
const router  = express.Router();

const { Pool } = require("pg");
const { string } = require('i/lib/util');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

let adminId;

module.exports = (db) => {
  router.get("/listings", (req, res) => {
    if (!req.session.is_admin) {
      res.redirect('/');
    } else {
      pool
        .query(`SELECT id FROM admins WHERE email = $1`, [req.session.user_id])
        .then((data) => {
          adminId = data.rows[0];
        }).then((data) => {
          pool.query(`SELECT * FROM items WHERE admin_id = $1;`, [adminId.id])
            .then((results) => {
              const value = req.session.user_id;
              const is_admin = req.session.is_admin;
              const tempVar = {items: results.rows, value, is_admin};
              res.render('listing', tempVar);
            });
        });
    }
  });
  return router;
};
