class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.integer :list_id, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.boolean :completed, null: false

      t.timestamps null: false
    end
  end
end
