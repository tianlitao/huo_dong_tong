class AddDetailsToDisplay < ActiveRecord::Migration
  def change
    add_column :displays, :success_status, :string
  end
end
