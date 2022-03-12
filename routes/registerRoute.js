// const express = require('express');
// const router  = express.Router();

// module.exports = (db) => {
//   router.get("/users", (req, res) => {
//     db.query(`INSERT INTO users (username, email, password )
//     VALUES ('$1', '$2' , '$3');` ,[])
//       .then(data => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
