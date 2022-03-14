const { Pool } = require("pg");
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


// before proceeding will need to set up cookies to get the admin id

const insertItem = function(itemInfo) {
  return pool
    .query(`INSERT INTO users (name, email, password, is_admin)
    VALUES ($1, $2, $3, $4) RETURNING *;`, [itemInfo[0], itemInfo[1], itemInfo[2], itemInfo[3]])
    .then((res) => {
      if (res.rowCount > 0) {
        console.log("Email used already", res.rowCount);
        return true;
      } else {
        console.log("You are good", res.rowCount);
        return false;
      }
    });
};
exports.insertItem = insertItem;
