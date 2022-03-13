// const items = require('./json/properties.json');
// const users = require('./json/users.json');

// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'labber',
//   password: 'labber',
//   host: 'localhost',
//   database: 'midterm'

// });


// const registerUserId = function(user) {
//   if (user[3] === "Admin") {
//     user[3] = true;
//   } else {
//     user[3] = false;
//   }

//   return pool
//     .query(`INSERT INTO users (name, email, password, is_admin)
//     VALUES ($1, $2, $3, $4);`, [user[0], user[1], user[2], user[3]])
//     .then((result) => {
//       return console.log('it worked');
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };
// module.exports = registerUserId;
