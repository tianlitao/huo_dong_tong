class Post < ActiveRecord::Base
  attr_accessible :name, :user, :number, :bid
  def self.post_message(user,message)
    Post.delete_all(:user => user)
    message.each do |activity|
      new_activity = Post.new(activity)
           new_activity.save
    end
  end
  def self.current_name(current)
    Post.where(:user => current)
  end
end
