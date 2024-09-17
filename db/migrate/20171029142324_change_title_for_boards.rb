class ChangeTitleForBoards < ActiveRecord::Migration[5.0]
  def change
    change_column_null :boards, :title, false
    change_column_default :boards, :title, nil
  end
end
