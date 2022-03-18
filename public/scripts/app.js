/* eslint-env jquery */
/* eslint-env browser */

// email password
// compare the email to database and then check password
// execute apicall .then response what you do with these reponses is where jquery comes in
// if 403 sliddown error

console.log("--------------AJA read----------");
$(()=> {

  $("#loginButton").submit(function(event) {
    event.preventDefault(); // Prevent the Default behaviour
    const serializedData = $(event.target).serialize();
    console.log('testtestesttsetestsetes', serializedData);

    $.post("/login", serializedData, () => {

    }).then((data)=>{
      window.location.replace("http://localhost:8080/");

    }).catch((err)=>{
      if (err.status) {
        $(".alert").text("⚠️ Email or Password are incorrect!!! ⚠️");
        $(".alert").addClass("alertTrue");
        $(".alertTrue").hide().slideDown();
      }
    });
  });
});
