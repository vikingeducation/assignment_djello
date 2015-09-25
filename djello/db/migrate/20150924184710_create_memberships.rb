class CreateMemberships < ActiveRecord::Migration
  def change
    create_table :memberships do |t|
      t.references :user, null: false
      t.references :card, null: false
      t.timestamps null: false
    end
  end
end
