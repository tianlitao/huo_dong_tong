class CreateApplies < ActiveRecord::Migration
  def change
    create_table :applies do |t|
      t.string :user
      t.string :name
      t.string :apply_name
      t.string :apply_phone

      t.timestamps
    end
  end
end
