const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/fav", (req, res) => {
    res.render("favourites");
  });
};
