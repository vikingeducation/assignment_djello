require 'rails_helper'

describe Activity do
  let(:activity){ build(:activity, :missing_verb)}

  describe 'validations' do
    it 'is invalid without a verb' do
      expect(activity).not_to be_valid
    end
    it 'is invalid without an object' do
      expect(build(:activity, :missing_object)).not_to be_valid
    end
  end
end
