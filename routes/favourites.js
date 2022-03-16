
const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');
const itemGet = require('../HelperFunctions/getAllItems.js');
const itemInsert = require('../HelperFunctions/insertItem.js');

module.exports = (db) => {
  router.get("/favourites", (req, res) => {
    const cookieItemId = req.session.itemid;
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    database.getUserId(accountEmail) // gets user id with email
      .then((val) => {
        const arr = [val.id, cookieItemId]; // user id and item it
        database.getUserFavCheck(arr) // check if favourties duplicates
          .then((s)=> {
            if (Number(s[0].count) < 1) {
              itemInsert.insertCookieItemId(arr); // if no duplicates insert into user favourites database
            }
          });
        database.getName(accountEmail).then((value) => { // Gets account name with email to render navbar
          //db.query(`SELECT item_id FROM user_favorites WHERE user_id = $1;`, [arr[0]])


          db.query(`SELECT user_favorites.user_id, user_favorites.item_id, user_favorites.id, items.*
          FROM user_favorites
          JOIN items
          ON user_favorites.item_id = items.id
         AND user_favorites.user_id = $1;`, [arr[0]])
            .then(data => {
              //console.log("data rows:", data.rows);

              const tempVar = {value, accountEmail, is_admin, items: data.rows};
              res.render("favourites", tempVar);
            });
        });
      });
  });
  router.post("/favourites", (req, res) => {
    //console.log("req session post",req.body);
    res.redirect("/favourites");
  });
  return router;
};






