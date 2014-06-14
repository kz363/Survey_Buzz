5.times {User.create(name: Faker::Name.name, email: Faker::Internet.email, password: Faker::Internet.password)}

10.times {Survey.create(title: Faker::Name.title, user_id: rand(1..5))}

50.times {Question.create(question: Faker::Company.bs, survey_id: rand(1..10))}

1000.times {Option.create(option: Faker::Lorem.sentence, question_id: rand(1..50))}
