/* eslint-env jquery */
/* eslint-env browser */

const { Pool } = require("pg/lib");


const createMessageElement = function(message) {

  const $message = $(`
  <div>
      <p><${message}</p>
  </div>
  `);
  return $message;
};

const rendermessage = function(message) {

  let allmessage;
  console.log('this is message', message);
  for (const objs of message) {
    allmessage = $(".messageBox").append(createMessageElement(objs));
  }

  return allmessage;
};


const loadMessages =  function() {
  Pool.query(`SELECT id FROM messages_session`).then((data) => {
    console.log("datadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadata: ", data.rows)
    rendermessage(data);
  });
};
console.log("did this workdid this workdid this workdid this workdid this work")
loadMessages();



