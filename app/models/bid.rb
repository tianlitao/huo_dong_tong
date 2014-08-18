class Bid < ActiveRecord::Base
  attr_accessible :name, :user, :bid_name, :apply_num, :bid_num, :status
  def self.post_activity(user, message)
     Bid.delete_all(:user => user)
    if message != nil
      message.each do |activity|
        bid = Bid.new(activity)
        bid.save
      end
    end
  end
  def self.current_bid_name(current_user, cookies)
    bidding=Bid.where(:user => current_user)
    bidding.where(:name => cookies)
  end
  def self.bid_status_display(username,name,bid_name)
    Bid.where(:user => username,:name => name,:bid_name => bid_name)
  end
end