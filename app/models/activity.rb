class Activity < ActiveRecord::Base

  attr_accessible :name, :user, :status, :token
end
