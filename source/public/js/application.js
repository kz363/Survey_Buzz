var isLoggedIn = $.ajax({
  url: "/isLoggedIn",
  type: "GET"
});

isLoggedIn.done(function(response) {
  if (response.isLoggedIn === true) {
    $('.surveys').css("visibility", "visible");
    $('#create input').css("visibility", "visible");
    $('nav ul li#name').text("Welcome, " + response.name);
    $('div.user_surveys').css("visibility", "visible");
    $('nav ul li input').css("visibility", "visible");
    $('.background-image').css("z-index", "-1")
  }
  else {
    $('#modal').show()
  }
})

$(document).ready(function() {

//////////////////////////CREATING SURVEYS/////////////////////////

  var currentQuestion = 1;
  var questionTotal = 1;
  $( document ).on('click', '#create_new_survey', function(event){
    event.preventDefault();
    $( '#create_new_survey' ).hide();
    $( '.surveys').hide();
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
    var question = '<a class="font" href="" id="question_'+questionTotal+'"><h4>Question '+questionTotal+'</h4></a><div class="question"><input type="text" name="question_'+questionTotal+'" placeholder="Survey Question"><br><input type="text" name="answer_'+optionCount+'" placeholder="Option"></div>'
    $( '#new_survey form input:eq(-1)').before(question);
    currentQuestion = $('#new_survey div.question').length;
    $(document).scrollTop($(document).height());
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

  $( document ).on('submit', '#survey_form', function(event){
    event.preventDefault();
    var survey_data = $(this).serialize();

    var request = $.ajax( { url:"/survey",
                            type: "POST",
                            data: survey_data,
                          });

    request.done(function(response){
      $( '#all_surveys' ).append( "<li><a href=''>"+response.title+"</a></li>" );
      $( '.user_surveys ul' ).append( "<li><a href=''>"+response.title+"</a></li>" );
      $( '#create_new_survey' ).show();
      $( '.surveys').fadeIn();
      $( '#new_survey' ).fadeOut();
      var domain = $("");
      $( 'div.survey_send_url li a').attr("href", "/survey/" + response.id);
      var surveyURL = $( 'div.survey_send_url li a').prop("href");
      $('div.survey_send_url li a').text(surveyURL);
      $( 'div.survey_send_url' ).fadeIn();
    });
  });


  $( "button#exit" ).on('click', function(event){
    event.preventDefault();

    $( 'div.survey_send_url' ).fadeOut();
  });


//////////////////////////TAKING SURVEYS/////////////////////////

  $( document ).on('submit', '#take_survey form', function(event){
    event.preventDefault();
    var survey_data = $(this).serialize();
    console.log(survey_data);

    var request = $.ajax( { url:"/survey",
                            type: "PUT",
                            data: survey_data,
                          });

    request.done(function(response){
      $( '#take_survey form' ).hide();
      $( '#take_survey' ).append( "<h1>Survey Complete!</h1>" );
    });

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
        $('.surveys').css("visibility", "visible");
        $('#create input').css("visibility", "visible");
        $('nav ul li#name').text("Welcome, " + response.name);
        $('div.user_surveys').css("visibility", "visible");
        $('nav ul li input').css("visibility", "visible");
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
          $('nav ul li#name').text("Welcome, " + response.name);
          $('div.user_surveys').css("visibility", "visible");
          $('nav ul li input').css("visibility", "visible");
      })
    }
  });

///////////////////////SIGN OUT////////////////////////////
  $('nav ul li input').on("click", function(e) {
    e.preventDefault();

    var request = $.ajax({
      url: "/signout",
      type: "get"
      })

    request.done(function(respone){
      // $('#modal').show();
      // $(".signup input[name='name']").val('');
      // $(".signup input[name='email']").val('');
      // $(".signup input[name='password']").val('');
      // $(".signin input[name='email']").val('');
      // $(".signin input[name='password']").val('');
      // $('.surveys').css("visibility", "hidden");
      // $('#create input').css("visibility", "hidden");
      // $('nav ul li#name').text('');
      // $('div.user_surveys').css("visibility", "hidden");
      // $('nav ul li input').css("visibility", "hidden");
      location.reload();
    })
  })

});
