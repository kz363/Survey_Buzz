class Option < ActiveRecord::Base
  belongs_to :question
  has_many :results
  has_many :users, through: :results
end
