post '/survey' do
  questionCount = 0
  @survey = Survey.create( title: params[:title],
                          user_id: params[:user_id] )
  question = Question.last

  params.each do |field, value|
    if field.to_s.start_with?("question")
      questionCount += 1
      question = Question.create( question: value,
                                  survey_id: @survey.id )
    elsif field.to_s.start_with?("answer")
      Option.create( option: value,
                     question_id: question.id )
    end
  end

  content_type :json
  {title: @survey.title, id: @survey.id}.to_json
end

