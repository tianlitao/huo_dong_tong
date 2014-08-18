class CreateDisplays < ActiveRecord::Migration
  def change
    create_table :displays do |t|
      t.string :user
      t.string :bid_name
      t.string :bid_phone

      t.timestamps
    end
  end
end
