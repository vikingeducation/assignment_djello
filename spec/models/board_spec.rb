require 'rails_helper'

describe "Board" do
  let(:user){ create(:user)}
  let(:untitled_board){ build(:board, :no_title)}
  let(:board){ build(:board)}

  describe 'validations' do
    it 'is invalid without a title' do
      expect(untitled_board).not_to be_valid
    end
    it 'is valid with a title' do
      expect(board).to be_valid
    end
  end
end
