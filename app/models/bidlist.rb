class Bidlist < ActiveRecord::Base
  attr_accessible :name, :user, :bid_name, :apply_name,:bid_phone,:status,:bid_price
  def self.post_bid_message(user,message)
    Bidlist.delete_all(:user => user)
    message.each do |activity|
      new_activity = Bidlist.new(activity)
      new_activity.save
    end
  end
end
