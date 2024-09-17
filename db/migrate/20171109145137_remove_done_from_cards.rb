class RemoveDoneFromCards < ActiveRecord::Migration[5.0]
  def change
    remove_column :cards, :done, :boolean
  end
end
