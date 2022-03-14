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
      console.log(res);
    });
};
exports.getUserEmail = getAllItems;
