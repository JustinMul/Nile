const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:itemid", (req, res) => {

    const itemId = req.params.itemid;
    console.log("id",req.params);


    db.query(`SELECT * FROM items WHERE id = $1`, [itemId])
      .then(data => {
        const templateVars = {item: data.rows[0]};
        res.render("itemid", templateVars);
        console.log(templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    })
 return router;
}
