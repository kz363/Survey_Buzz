$(document).ready(function() {

//////////////////////////SURVEY STUFF/////////////////////////

  var currentQuestion = 1;
  var questionTotal = 1;
  $( document ).on('click', '#create_new_survey', function(event){
    event.preventDefault();
    $( '#create_new_survey' ).hide();
    $( '#new_survey' ).show();
  });

  var optionCount = 2;
  $( document ).on('click', '#add_option', function(event){
    event.preventDefault();
    var option = '<div id="field'+optionCount+'"><input type="text" name="answer'+optionCount+'" placeholder="Option"> <a href=""><button id="'+optionCount+'" class="remove_button" type="button">Remove</button></a></div>';
    $( '#new_survey form #question_'+currentQuestion ).next().append(option);
    optionCount++;
  });

  var questionCount = 2;
  $( document ).on('click', '#add_question', function(event){
    event.preventDefault();
    questionTotal++;
    $( '#new_survey div.question' ).hide();
    var question = '<a href="" id="question_'+questionTotal+'"><h4>Question '+questionTotal+'</h4></a><div class="question"><input type="text" name="question_'+questionTotal+'" placeholder="Survey Question"><br><input type="text" name="answer_'+optionCount+'" placeholder="Option"></div>'
    $( '#new_survey form input:eq(-1)').before(question);
    currentQuestion = $('#new_survey div.question').length;
  });

  $( document ).on('click', '.remove_button', function(event){
    event.preventDefault();
    var id = $(this).attr("id");
    $( "#field"+id ).remove();
  });

  $( document ).on('click', '[id^=question]', function(event){
    event.preventDefault();
    currentQuestion = parseInt($(this).attr("id").slice(-1),10);
    $( '#new_survey div.question' ).hide();
    $(this).next().show();
  });

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
