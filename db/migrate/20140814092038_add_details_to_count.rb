class AddDetailsToCount < ActiveRecord::Migration
  def change
    add_column :counts, :toke, :string
  end
end
