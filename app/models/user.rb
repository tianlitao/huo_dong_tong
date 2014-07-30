class User < ActiveRecord::Base
  has_secure_password
  attr_accessible :name, :password, :password_confirmation, :question, :answer, :token
  before_create { generate_token(:token) }
validates :name, :presence => true,:uniqueness => {:case_sensitive => false}
  validates :question, :presence => true
  validates :answer, :presence => true
  validates :password, :length => {:minimum => 6}, :on => :create
  def generate_token(column)
    begin
      self[column]=SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end
end
