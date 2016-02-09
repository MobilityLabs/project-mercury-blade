class AddFlagCountToImages < ActiveRecord::Migration
  def change
    add_column :images, :flag_count, :integer, default: 0
  end
end
