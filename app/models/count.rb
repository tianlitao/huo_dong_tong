class Count < ActiveRecord::Base
  attr_accessible :name, :user, :bid_name, :price,:count
  def self.post_price_count(user,message)
    Count.delete_all(:user => user)
    message.each do |activity|
      new_activity = Count.new(activity)
      new_activity.save
    end
  end
end
