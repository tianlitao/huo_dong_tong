class User < ActiveRecord::Base

  attr_accessible :name, :password, :password_confirmation, :question, :answer,:admin, :token
  before_create { generate_token(:token) }
validates :name, :presence => true,:uniqueness => {:case_sensitive => false}
  validates :password,:presence => true, :on => :create
  has_secure_password
  validates :question, :presence => true
  validates :answer, :presence => true


  def self.get_activity(name)
    User.find_by_name(name)
  end
  def generate_token(column)
    begin
      self[column]=SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end
end
