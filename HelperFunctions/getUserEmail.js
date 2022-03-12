const { Pool } = require("pg");
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});
const getUserWithEmail = function(arr) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [arr[1]])
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
module.exports = getUserWithEmail;
