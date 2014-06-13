$(document).ready(function() {

//////////////////////////SIGN UP/////////////////////////

  $(".signup form #button").on("click", function(event) {
    event.preventDefault();

    var userName = $(".signup input[name='name']").val();
    var userEmail = $(".signup input[name='email']").val();
    var userPassword = $(".signup input[name='password']").val();
    var errorList = $("div.signup")
    if (!userName) {
      var userNameError = "Must Have a User Name!"
      errorList.append(userNameError)
    } else if (!userEmail) {
      var userEmailError = "Must Have an Email!"
      errorList.append(userEmailError)
    } else if (userEmail.search(/.+\@.+\..+/) == -1) {
      var userEmailError = "Must Have a valid Email!"
      errorList.append(userEmailError)
    } else if (!userPassword) {
      var userPasswordError = "Must Have a password!"
      errorList.append(userPasswordError)
    } else {
      var request = $.ajax({
        url: "/signup",
        type: "POST",
        data: {name: userName, email: userEmail, password: userPassword}
      })

      request.done(function (response) {
        $('#modal').css("visibility","hidden");
        $('.surveys').css("visibility", "visible");
        $('#create input').css("visibility", "visible");
        $('nav ul li #name').text(response.name);
        $('div.user_surveys').css("visibility", "visible");
        $('nav form input').css("visibility", "visible");
      })
    }
  })

////////////////////////////SIGN IN///////////////////////////

  $(".signin form #button").on("click", function(event) {
    event.preventDefault();

    var userEmail = $(".signin input[name='email']").val();
    var userPassword = $(".signin input[name='password']").val();
    var errorList = $("div.signin")
    if (!userEmail) {
      var userEmailError = "Must Have a Email!"
      errorList.append(userEmailError)
    } else if (userEmail.search(/.+\@.+\..+/) == -1) {
      var userEmailError = "Must Have a valid Email!"
      errorList.append(userEmailError)
    } else if (!userPassword) {
      var userPasswordError = "Must Have a password!"
      errorList.append(userPasswordError)
    } else {
    var request = $.ajax({
      url: "/signin",
      type: "POST",
      data: {email: userEmail, password: userPassword}
      })

      request.done(function (response) {
          $('#modal').css("visibility","hidden");
          $('.surveys').css("visibility", "visible");
          $('#create input').css("visibility", "visible");
          $('nav ul li#name').text(response.name);
          $('div.user_surveys').css("visibility", "visible");
          $('nav form input').css("visibility", "visible");
      })
    }
  });

///////////////////////SIGN OUT////////////////////////////
  $('nav form input').on("click", function(e) {
    e.preventDefault();

    var request = $.ajax({
      url: "/signout",
      type: "get"
      })

    request.done(function(respone){
      $('#modal').css("visibility","visible");
      $(".signup input[name='name']").val('');
      $(".signup input[name='email']").val('');
      $(".signup input[name='password']").val('');
      $(".signin input[name='email']").val('');
      $(".signin input[name='password']").val('');
      $('.surveys').css("visibility", "hidden");
      $('#create input').css("visibility", "hidden");
      $('nav ul li#name').text('');
      $('div.user_surveys').css("visibility", "hidden");
      $('nav form input').css("visibility", "hidden");
    })
  })

});
