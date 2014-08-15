class CreateCounts < ActiveRecord::Migration
  def change
    create_table :counts do |t|
      t.string :user
      t.string :name
      t.string :bid_name
      t.string :price
      t.string :count

      t.timestamps
    end
  end

end
