/* eslint-env jquery */
/* eslint-env browser */

const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');

module.exports = (db) => {
  router.get("/smsLog", (req, res) => {

    const id = req.params.id;
    req.session.itemid = id;
    const cookieItemId = req.session.itemid;
    const accountEmail = req.session.user_id;
    const is_admin = req.session.is_admin;
    const adminEmail = req.session.adminEmail;

    db.query(`SELECT * FROM messages_log
    JOIN messages_session on messages_session.id = messages_log.messages_session_id`).then((data) => {
      // console.log("data: ", data.rows);

      let idStorage = [];
      let objStorage = [];
      const smsData = data.rows;

      smsData.forEach(element => {
        console.log(' this is the element', element);

        if (idStorage.indexOf(element.id) === -1) {
          idStorage.push(element.id);
          objStorage.push(element);
        }

      });
      console.log(objStorage)
      const templateVars = {sms: objStorage, accountEmail};
      // console.log(templateVars )




      res.render("smsLog", templateVars);
    });

  });



  return router;
};

