class Display < ActiveRecord::Base
  attr_accessible  :user, :bid_name, :bid_phone, :bid_price, :success_status
  def self.display(user,message)
    Display.delete_all(:user => user)

    if message !=nil
      message.each do |activity|
        new_activity = Display.new(activity)
        new_activity.save
      end
    end
  end
end
