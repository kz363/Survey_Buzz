require'bcrypt'
class User < ActiveRecord::Base
  include BCrypt

  has_many :surveys
  has_many :results
  has_many :options, through: :results

  validates_presence_of :name
  validates_uniqueness_of :email
  validates :email, presence: true, email: true

  def password=(plaintext)
    @password = Password.create(plaintext)
    self.password_hash = BCrypt::Password.create(plaintext)
  end

  def password
    @password ||= Password.new(password_hash)
  end

  def authenticate(password)
    if BCrypt::Password.new(self.password_hash) == password
      return true
    else
      return false
    end
  end
end
