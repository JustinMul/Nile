const { Pool } = require("pg");
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const getAllItems = function() {
  return pool
    .query(`SELECT * FROM items`)
    .then((res) => {
      return res.rows;
    });
};
exports.getAllItems = getAllItems;

const getUserFavourite = function(id) {
  return pool
    .query(`SELECT * FROM items WHERE id = $1`, [id])
    .then((res) => {
      return res.rows;
    });
};
exports.getUserFavourite = getUserFavourite;
