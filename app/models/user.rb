class User < ActiveRecord::Base

  attr_accessible :name, :password, :password_confirmation, :question, :answer, :token
  before_create { generate_token(:token) }

validates :name, :presence => true,:uniqueness => {:case_sensitive => false}
  validates :password,:presence => true, :on => :create
  has_secure_password
  validates :question, :presence => true
  validates :answer, :presence => true

  def generate_token(column)
    begin
      self[column]=SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end
end
