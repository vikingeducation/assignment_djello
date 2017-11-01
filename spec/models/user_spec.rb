require 'rails_helper'

describe "User" do
  let(:user){ create(:user)}
  let(:board){ create(:board, owner: user)}


  describe '#full_name' do
    it 'returns a user\'s full name' do
      expect(user.full_name).to eq(user.first_name + ' ' + user.last_name)
    end
  end

  describe '#boards' do
    it 'returns a user\'s boards' do
      board
      expect(user.boards.first.title).to eq('Board Title 1')
    end
  end
end
