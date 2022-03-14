const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/items", (req, res) => {
    res.render("items");
  });


  router.post("/items", (req, res) => {
    console.log(req.body);
    const temVar = req.body;
    const title = temVar.title;
    const description = temVar.description;
    const thumbnailPhotoUrl = temVar.thumbnail_photo_url;
    const coverPhotoUrl = temVar.cover_photo_url;
    const cost = temVar.cost;
    // const date = ;
    const country = temVar.country;
    const city = temVar.city;
    const province = temVar.province;


  });
  return router;
};
