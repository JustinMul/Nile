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
  router.get("/items/:id/edit", (req, res) => {
    // console.log("cookie session for GET TEST: ", req.session.user_id);
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    //console.log('this is req.session', req.session);

    const id = req.session.id;
    const cookieItemId = req.session.itemid;
    console.log('this is req.session',req.session)

    console.log('this is ID', cookieItemId)
    //console.log("accountemail cookie",accountEmail);

    data.getName(accountEmail).then((value) => {
      // console.log("TEST NAME: ", value);
      const templateVars = {value, is_admin, cookieItemId};
      res.render("edit", templateVars);
    });
  });


  router.post("/items/:id/edit", (req, res) => {
    //console.log(req.session.user_id);
    //console.log(req.body);

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
    const cookieItemId = req.session.itemid;

    pool
      .query(`Select id FROM admins WHERE email = $1`, [req.session.user_id])
      .then((res) => {
        return  adminId = res.rows[0];
      }).then((admin) => {
        const itemArr = [adminId.id,title,description,thumbnailPhotoUrl,coverPhotoUrl,cost,date,country,city,province,cookieItemId];
        return pool
          .query(`Update items
          SET admin_id = $1, title = $2, description = $3, thumbnail_photo_url = $4, cover_photo_url = $5, cost = $6, date = $7, country =  $8, city = $9, province = $10 WHERE id = $11`, [itemArr[0], itemArr[1], itemArr[2], itemArr[3], itemArr[4], itemArr[5], itemArr[6], itemArr[7], itemArr[8], itemArr[9], itemArr[10]]
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

  return yyyy + '-' + (mmChars[1]?mm:"0"+ mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}

//console.log(convertDate(todaysDate));
