class Post < ActiveRecord::Base
  attr_accessible :name, :user, :number, :bid
end
