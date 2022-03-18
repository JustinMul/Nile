/* eslint-env jquery */
/* eslint-env browser */
const load = require('../../HelperFunctions/loadMessage');

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
  const $form = $(".messageBox");
  $form.empty();
  for (const objs of message) {
    const sms = createMessageElement(objs);
    $form.append(sms);
  }

  return allmessage;
};




console.log("did this workdid this workdid this workdid this workdid this work");

$(() => {
  load.loadMessages().then((data)=> {
    rendermessage(data);
  });

});

