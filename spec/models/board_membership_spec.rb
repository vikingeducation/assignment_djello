require 'rails_helper'

describe BoardMembership do

  let(:membership){create(:board_membership)}

  describe 'validations' do
    it 'does not allow duplicates' do
      membership
      new_membership = BoardMembership.new(user: membership.user, board: membership.board)
      expect(new_membership).not_to be_valid
    end
  end
end
