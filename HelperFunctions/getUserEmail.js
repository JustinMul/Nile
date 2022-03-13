const { Pool } = require("pg");
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});
const getUserEmail = function(email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
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
exports.getUserEmail = getUserEmail;

const registerUserId = function(user) {
  if (user[3] === "Admin") {
    user[3] = true;
  } else {
    user[3] = false;
  }

  return pool
    .query(`INSERT INTO users (name, email, password, is_admin)
  VALUES ($1, $2, $3, $4) RETURNING *;`, [user[0], user[1], user[2], user[3]])
    .then((result) => {
      return console.log('it worked');
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.registerUserId = registerUserId;
