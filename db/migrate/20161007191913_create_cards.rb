class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.string :title
      t.text :body
      t.boolean :completed
      t.references :list

      t.timestamps
    end
  end
end
