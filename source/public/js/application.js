$(document).ready(function() {
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
});
