class Bid < ActiveRecord::Base
  attr_accessible :name, :user, :bid_name, :apply_num,:bid_num
  def self.post_activity(user,message)
    Bid.delete_all(:user => user)
    message.each do |activity|
      bid = Bid.new(activity)
      bid.save
    end
  end
end
