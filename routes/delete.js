const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/insertItem.js');
const data = require('../HelperFunctions/getUserEmail.js');

const { Pool } = require("pg");
const { string } = require('i/lib/util');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

module.exports = (db) => {
  router.post("/items/:id/delete", (req, res) => {
    let adminId;
    const cookieItemId = req.session.itemid;
    pool
      .query(`Select id FROM admins WHERE email = $1`, [req.session.user_id])
      .then((res) => {
        return  adminId = res.rows[0];
      }).then((admin) => {
        const itemArr = [adminId.id,cookieItemId];
        return pool
          .query(`DELETE FROM items
          WHERE admin_id = $1 and id = $2`, [itemArr[0], itemArr[1]]
          )
          .then((data) => {
            res.redirect('/listings');
          });

      });

  });



  return router;
};
let todaysDate = new Date();

const convertDate = function(date) {
  let yyyy = date.getFullYear().toString();
  let mm = (date.getMonth() + 1).toString();
  let dd  = date.getDate().toString();

  let mmChars = mm.split('');
  let ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+ mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}

console.log(convertDate(todaysDate));
