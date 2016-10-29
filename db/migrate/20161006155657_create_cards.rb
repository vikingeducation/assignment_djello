class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.references :list
      t.string :title
      t.text :description
      t.timestamps
    end
  end
end
