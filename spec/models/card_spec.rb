require 'rails_helper'

describe Card do
  let(:list){ create(:list)}
  describe 'validations' do

    it 'is not valid without a title' do
      expect(Card.new).to be_invalid
    end

    it 'is not valid whtout a list id' do
      expect(Card.new(title: 'With title')).to be_invalid
    end

    it 'is valid with a title' do
      expect(Card.new(title: 'A new card', list: list)).to be_valid
    end
  end
end
