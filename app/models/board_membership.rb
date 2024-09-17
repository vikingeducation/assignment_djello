class BoardMembership < ApplicationRecord
  belongs_to :user
  belongs_to :board

  validates :user, uniqueness: {scope: :board, message: 'already a member of this board'}
end
