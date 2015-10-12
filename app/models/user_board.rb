class UserBoard < ActiveRecord::Base

  belongs_to :member, 
              foreign_key: :user_id,
              class_name: 'User'

  belongs_to :assigned_board,
              foreign_key: :board_id,
              class_name: 'Board'

  validates :user_id, :board_id, :role, presence: true
  validates :role, inclusion: { in: %w(creater participator) }
end
