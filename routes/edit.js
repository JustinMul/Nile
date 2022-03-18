const express = require('express');
const router  = express.Router();
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
  router.get("/items/:id/edit", (req, res) => {
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    const id = req.params.id;
    req.session.itemid = id;
    const cookieItemId = req.session.itemid;

    data.getName(accountEmail).then((value) => {
      db.query(`SELECT * FROM items WHERE id = $1`, [id])
        .then(data => {
          const templateVars = {item: data.rows[0],value, is_admin, cookieItemId};
          res.render("edit", templateVars);

        });
    });
  });


  router.post("/items/:id/edit", (req, res) => {

    let adminId;
    const temVar = req.body;
    const title = temVar.title;
    const description = temVar.description;
    const thumbnailPhotoUrl = temVar.thumbnail_photo_url;
    const coverPhotoUrl = temVar.cover_photo_url;
    const cost = temVar.cost;
    const date = convertDate(new Date());
    const country = temVar.country;
    const city = temVar.city;
    const province = temVar.province;
    const sold = temVar.sold;
    const cookieItemId = req.session.itemid;
    console.log("cookieItemId ofr edits: ", cookieItemId);
    pool
      .query(`Select id FROM admins WHERE email = $1`, [req.session.user_id])
      .then((result) => {
        adminId = result.rows[0].id;

        const itemArr = [adminId,title,description,thumbnailPhotoUrl,coverPhotoUrl,cost,date,country,city,province,sold,cookieItemId];
        return pool
          .query(`Update items
          SET admin_id = $1, title = $2, description = $3, thumbnail_photo_url = $4, cover_photo_url = $5, cost = $6, date = $7, country =  $8, city = $9, province = $10, sold = $11 WHERE id = $12;`, [itemArr[0], itemArr[1], itemArr[2], itemArr[3], itemArr[4], itemArr[5], itemArr[6], itemArr[7], itemArr[8], itemArr[9], itemArr[10],itemArr[11]]

          )
          .then((data) => {
            //console.log('item was added edited');
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

  return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
};

