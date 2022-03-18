/* eslint-env jquery */
/* eslint-env browser */

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
