const { Pool } = require("pg");
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


const loadMessages =  function() {
  return Pool.query(`SELECT messages_session_id FROM messages_log`).then((data) => {
    console.log("datadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadata: ", data.rows);
    return data.rows;
  });
};

exports.loadMessages = loadMessages;
