class CreateLists < ActiveRecord::Migration[5.0]
  def change
    create_table :lists do |t|
      t.string :title
      t.text :description
      t.references :board, foreign_key: true

      t.timestamps
    end
  end
end
