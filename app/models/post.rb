class Post < ActiveRecord::Base
  attr_accessible :name, :user, :number, :bid
  def self.post_message(user,message)
    Post.delete_all(:user => user)
    if message != nil
      p "555555555555"
      p message
    message.each do |activity|
      p activity
      p "666666666666"
      new_activity = Post.new(activity)
      p "7777777777777"
      new_activity.save

      end
    end
  end
  def self.current_name(current)
    Post.where(:user => current)
  end
end
