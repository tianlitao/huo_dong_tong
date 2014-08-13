class CreateBids < ActiveRecord::Migration
  def change
    create_table :bids do |t|
      t.string :user
      t.string :name
      t.string :bid_name
      t.string :bid_num
      t.string :apply_num

      t.timestamps
    end
  end
end
