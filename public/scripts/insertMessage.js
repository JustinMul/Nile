const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const insertMessage = function(messageInfo) {
  console.log('it runs');
  console.log('this is message infoooooooo', messageInfo);
  return pool
    .query(`INSERT INTO messages_session (user_email, item_id)
    VALUES ($1, $2) RETURNING *;`,[messageInfo[0], Number(messageInfo[1])])
    .then((res) => {
      console.log('it worked and is in messages_sessions');
    });
};
exports.insertMessage = insertMessage;

const insertMessageLog = function(messageInfo) {
  return pool
    .query(`INSERT INTO messages_log (message, messages_session_id)
    VALUES ($1, $2) RETURNING *;`,[messageInfo[0], Number(messageInfo[1])])
    .then((res) => {
      console.log('it worked and is in messages_sessions');
    });
};

exports.insertMessageLog  = insertMessageLog;

const getMessageSessionId = function(arr) {
  return pool
    .query(`SELECT id FROM messages_session WHERE user_email = $1 AND item_id = $2;`,[arr[0], Number(arr[1])])
    .then((res) => {
      return res.rows[0].id;
    });
};
exports.getMessageSessionId = getMessageSessionId;
