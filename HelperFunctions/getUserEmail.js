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

const getAdminEmail = function(email) {
  return pool
    .query(`SELECT * FROM admins WHERE email = $1`, [email])
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
exports.getAdminEmail = getAdminEmail;

const registerUserId = function(user) {
  return pool
    .query(`INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3) RETURNING *;`, [user[0], user[1], user[2]])
    .then((result) => {
      return console.log('it worked');
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.registerUserId = registerUserId;

const registerAdminId = function(admin) {
  return pool
    .query(`INSERT INTO admins (name, email, password)
VALUES ($1, $2, $3) RETURNING *;`, [admin[0], admin[1], admin[2]])
    .then((result) => {
      return console.log('it worked');
    })
    .catch((err) => {
      console.log(err.message);
    });

};
exports.registerAdminId = registerAdminId;

const getName = function(email) {
  return pool
    .query(`SELECT name FROM users WHERE email = $1`, [email])
    .then((res) => {
      if (res.rowCount > 0) {
        console.log("Email in database", res);
        return res.rows[0].name;
      } else {
        console.log("Not in users database, checking admin...", res.rowCount);
        return pool
          .query(`SELECT name FROM admins WHERE email = $1`, [email])
          .then((res) => {
            if (res.rowCount > 0) {
              console.log("Email in admin database", res.rows[0].name);
              return res.rows[0].name;
            } else {
              console.log("You are good", res.rowCount);
              return false;
            }
          });
      }
    });
};
exports.getName = getName;
