class Bidlist < ActiveRecord::Base
  attr_accessible :name, :user, :bid_name, :apply_name,:bid_phone,:status,:bid_price
  def self.post_bid_message(user,message)
    Bidlist.delete_all(:user => user)
    if message !=nil
    message.each do |activity|
      new_activity = Bidlist.new(activity)
      new_activity.save
    end
      end
  end
  def self.bid_message_display(username,name,bid_name)
    Bidlist.where(:user => username,:name => name,:bid_name => bid_name)
  end
end
