// const items = require('./json/properties.json');
// const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'

});


const registerUserId = function(user) {

  return pool
    .query(`INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3);`, [user[0], user[1], user[2]])
    .then((result) => {
      return console.log('it worked');
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = registerUserId;
