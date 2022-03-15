const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');
const itemGet = require('../HelperFunctions/getAllItems.js');
const itemInsert = require('../HelperFunctions/insertItem.js');
itemInsert.insertCookieItemId;
module.exports = (db) => {
  router.get("/favourites", (req, res) => {
    const cookieItemId = req.session.itemid;
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    database.getUserId(accountEmail)
      .then((val) => {
        const arr = [val.id, cookieItemId];
        database.getUserFavCheck(arr)
          .then((s)=> {
            if (Number(s[0].count) < 1) {
              itemInsert.insertCookieItemId(arr);
            }
          });
        database.getName(accountEmail).then((value) => {
          db.query(`SELECT item_id FROM user_favorites WHERE user_id = $1;`, [arr[0]])
            .then(data => {
              console.log("datadatadatadatadatadata", data.rows[0].item_id);
              const arrList = [];
              for (let i = 0; i < data.rows.length; i++) {
                let itemIdList = data.rows[i].item_id;
                itemGet.getUserFavourite(itemIdList)
                  .then((v)=> {
                    arrList.push(v);
                  });
              }
              console.log("arrListarrListarrListarrListarrListarrListarrListarrListarrListarrListarrListarrListarrListarrListarrListarrListarrListarrListarrList",arrList);
              const tempVar = {item:data.rows,value, accountEmail, is_admin};
              res.render("favourites", tempVar);
            });
        });
      });
  });
  router.post("/favourites", (req, res) => {
    console.log("req session post",req.body);
    res.redirect("/favourites");
  });
  return router;
};

