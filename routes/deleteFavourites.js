const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/insertItem.js');
const data = require('../HelperFunctions/getUserEmail.js');


module.exports = (db) => {
  router.post("/favourites/<%=item.id%>/delete", (req, res) => {


    const cookieItemId = req.session.itemid;
    const accountEmail = req.session.user_id;

    data.getUserId(accountEmail)
      .then((result)=>{
        const userId = result.id;
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxID: ', userId, ' cookie item id: ', Number(cookieItemId));
        db.query(`DELETE FROM user_favorites WHERE user_id = $1 AND item_id = $2;`, [userId, Number(cookieItemId)])
          .then((val) => {
            console.log('successful delete');
            res.redirect('/favourites');
          });
      });
  });
  return router;
};

