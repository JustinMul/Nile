const express = require('express');
const router  = express.Router();
const database = require('../HelperFunctions/getUserEmail.js');

module.exports = (db) => {
  router.get("/smsLog", (req, res) => {

    const id = req.params.id;
    req.session.itemid = id;
    const cookieItemId = req.session.itemid;
    const accountEmail = req.session.user_id;

    db.query(`SELECT * FROM messages_log
    JOIN messages_session on messages_session.id = messages_log.messages_session_id`).then((data) => {

      const smsData = data.rows;
      const templateVars = {sms: smsData, accountEmail};

      res.render("messages", templateVars);
    });

  });



  return router;
};

