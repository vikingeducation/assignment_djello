class Membership < ApplicationRecord
  belongs_to :card
  belongs_to :user
  after_create :create_board_membership
  validate :card_exists, :user_exists, on: :create

  include Reusable

  validates :user, uniqueness: {scope: :card, message: 'cannot have more than one membership to the same card'}

  private

  def card_exists
    raise ActiveRecord::RecordInvalid unless Card.exists?(self.card_id)
  end

  def user_exists
    raise ActiveRecord::RecordInvalid unless User.exists?(self.user_id)
  end

end
