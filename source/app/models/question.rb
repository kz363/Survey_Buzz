class Question < ActiveRecord::Base
  belongs_to :survey
  has_many :options

  validates_presence_of :question

end
