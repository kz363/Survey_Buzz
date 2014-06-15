class Question < ActiveRecord::Base
  belongs_to :survey
  has_many :options
  has_many :results, through: :options

  validates_presence_of :question

end
