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
    .query(`INSERT INTO items (admin_id, title, description, thumbnail_photo_url, cover_photo_url, cost, date,country, city, province)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`, [itemInfo[0], itemInfo[1], itemInfo[2], itemInfo[3], itemInfo[4], itemInfo[5], itemInfo[6], itemInfo[7], itemInfo[8], itemInfo[9]])
    .then((res) => {
      console.log('item was added successfully');
    });
};
exports.insertItem = insertItem;
