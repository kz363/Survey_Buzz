class Survey < ActiveRecord::Base
  belongs_to :user
  has_many :questions

  validates_presence_of :title
  validates_uniqueness_of :title
end
