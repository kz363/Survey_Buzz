post '/survey' do
  questionCount = 0



  survey = Survey.create( title: params[:title],
                          user_id: params[:user_id] )

  question = Question.last

  params.each do |field, value|
    if field.to_s.start_with?("question")
      questionCount += 1
      question = Question.create( question: value,
                                  survey_id: survey.id )
    elsif field.to_s.start_with?("answer")
      Option.create( option: value,
       question_id: question.id )
    end
  end

  content_type :json
  {title: survey.title, id: survey.id}.to_json
end



get '/survey/:survey_id' do
  @survey = Survey.find(params[:survey_id])
  if session[:user_id]
    # if the user already has an entry in the Result table with an option that belonged to @survey, raise an error
    if Result.any?{ |r| r.user_id == session[:user_id] && Option.find(r.option_id).question.survey.id == @survey.id }
      puts "*"*50
      @error = "You've already taken this survey."
    end
  end
  erb :"take_survey"
end

put '/survey' do
  params.each do |question_id, option_id|
    unless question_id.start_with?("_method")
      if session[:user_id]
        Result.create( user_id: session[:user_id],
          option_id: option_id )
      else
        Result.create( option_id: option_id )
      end
    end
  end
  return "Survey Complete!"
end

