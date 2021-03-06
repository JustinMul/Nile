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
  router.get("/items", (req, res) => {
    if (req.session.is_admin) {
      // console.log("cookie session for GET TEST: ", req.session.user_id);
      const accountEmail = req.session.user_id;
      const is_admin = req.session.is_admin;
      console.log("accountemail cookie",accountEmail);
      data.getName(accountEmail).then((value) => {
        console.log("TEST NAME: ", value);
        const templateVars = {value, is_admin};
        res.render("items", templateVars);
      });
    } else {
      res.redirect("/");
    }
  });

  router.post("/items", (req, res) => {
    console.log(req.session.user_id);
    console.log(req.body);

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

    pool
      .query(`SELECT id FROM admins WHERE email = $1`, [req.session.user_id])
      .then((res) => {
        return  adminId = res.rows[0];
      }).then((admin) => {
        const itemArr = [adminId.id,title,description,thumbnailPhotoUrl,coverPhotoUrl,cost,date,country,city,province];
        database.insertItem(itemArr);
        res.redirect("/");
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
