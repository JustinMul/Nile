// Login route - Jack v1.0
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const database = require('../HelperFunctions/getUserEmail.js');




module.exports = (db) => {

  router.get("/login", (req, res) => {
    res.render("login");

  });

  router.post("/login", (req, res) => {
    console.log('this is res', req.body);

    const temVar = req.body;
    const email = temVar.email;
    const password = temVar.password;
    req.session.user_id = email;
    console.log(req.session)

    database.getUserEmail(email) // Checks helper funciton asynchronously
      .then((value) => {// Returns true or false
        console.log("value for getUserEmail", value);
        if (value) {
          return db
            .query(`SELECT password FROM users WHERE email = $1`, [email])
            .then((responds) => {
              const hashedPassword = responds.rows[0].password;
              console.log("stuff i guess", responds.rows[0].password, bcrypt.compareSync(password, hashedPassword));
              if (bcrypt.compareSync(password, hashedPassword)) {
                res.redirect("/");
              } else {
                res.status(403).send("<h1>403</h1><h2>Email or password does not exist or incorrect</h2>");
              }
            });
        } else {
          database.getAdminEmail(email)
            .then((value) => {
              if (value) {
                return db
                  .query(`SELECT password FROM admins WHERE email = $1`, [email])
                  .then((responds) => {
                    const hashedPassword = responds.rows[0].password;
                    console.log("stuff i guess", responds.rows[0].password, bcrypt.compareSync(password, hashedPassword));
                    if (bcrypt.compareSync(password, hashedPassword)) {
                      res.redirect("/");
                    } else {
                      res.status(403).send("<h1>403</h1><h2>Email or password does not exist or incorrect</h2>");
                    }
                  });
              } else {
                res.status(403).send("<h1>400</h1><h2>Email or password does not exist or incorrect</h2>");
              }
            });
        }
      });
  });
  return router;
};
