class Activity < ActiveRecord::Base
  attr_accessible :name, :user, :apply_phone, :apply_name
  def self.post_activity(user,message)
    Activity.delete_all(:user => user)
    if message !=nil
    message.each do |activity|
      new_activity = Activity.new(activity)
      new_activity.save
    end
      end
  end
  def self.current_activity_name(current_user,cookies)
    bidding=Activity.where(:user => current_user)
    bidding.where(:name => cookies)
  end
end
