require 'active_support/concern'

module Reusable
  extend ActiveSupport::Concern

  def create_board_membership
    unless BoardMembership.where(board_id: self.id, user_id: self.user_id).exists?
      BoardMembership.create(board_id: self.id, user_id: self.user_id)
    end
  end
end
