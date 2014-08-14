class CreateBidlists < ActiveRecord::Migration
  def change
    drop_table :bidlists
    create_table :bidlists do |t|
      t.string :user
      t.string :name
      t.string :bid_name
      t.string :apply_name
      t.string :bid_phone
      t.string :bid_price
      t.string :status

      t.timestamps
    end
  end
end
