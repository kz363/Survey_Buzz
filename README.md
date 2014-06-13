Survey_Buzz
===========

User
create account, log in/ log out, create survey, delete survey, edit survey
see all their surveys
homepage: display all surveys
  has_many :surveys
  take a survey if you have link



Survey
  can be made private
  has many questions
  belongs_to :user
  
  
Questions
  question
  has_many :options
  belongs_to :survey
  
  
Options
  belongs_to :question
  
  

