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
//now working need to get visual output!
module.exports = (db) => {
  router.get("/listings", (req, res) => {

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
            console.log('this is temp vars', tempVar);
            res.render('listing', tempVar);
          });
      });

  });

  // router.post("/items/:id/delete", (req, res) => {
  //   pool
  //     .query(`SELECT id FROM admins WHERE email = $1`, [req.session.user_id])
  //     .then((data) => {
  //       console.log('inhere?');
  //       adminId = data.rows[0];
  //     }).then((data) => {

  //       pool.query(`DELETE * FROM items WHERE admin_id = $1;`, [adminId.id])
  //         .then((data) => {
  //           console.log('it was deleted');
  //           res.redirect('listing');
  //         });

  //     });
  // });
  return router;
};
