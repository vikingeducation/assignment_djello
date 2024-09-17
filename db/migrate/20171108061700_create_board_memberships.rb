class CreateBoardMemberships < ActiveRecord::Migration[5.0]
  def change
    create_table :board_memberships do |t|
      t.references :user, foreign_key: true
      t.references :board, foreign_key: true

      t.timestamps
    end
  end
end
