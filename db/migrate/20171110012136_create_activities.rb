class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      t.references :user, foreign_key: true, null: false
      t.references :card, foreign_key: true, null: false
      t.string :object, null: false
      t.string :value
      t.string :verb, null: false

      t.timestamps
    end
  end
end
