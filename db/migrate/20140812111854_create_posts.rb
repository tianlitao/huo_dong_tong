class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :user
      t.string :name
      t.string :number
      t.string :bid

      t.timestamps
    end
  end
end
