class User < ActiveRecord::Base
  has_many :surveys
  has_many :results
  has_many :options, through: :results

  validates_presence_of :name
  validates_uniqueness_of :email
  validates :email, presence: true, email: true

  def password=(plaintext)
    self.password_hash = Bcrypt::Password.create(plaintext)
  end

  def authenticate(plaintext_password)
    if BCrypt::Password.new(self.password_hash) == plaintext_password
      return true
    else
      return false
    end
  end
end
