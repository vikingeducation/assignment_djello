class User < ApplicationRecord
  has_many :boards, dependent: :destroy
  has_many :lists, through: :boards
  has_many :cards, through: :lists
  has_many :memberships
  has_many :all_cards, through: :memberships, source: :card
  has_many :board_memberships, dependent: :destroy
  has_many :all_boards, through: :board_memberships, source: :board
  has_many :activities, dependent: :destroy

  has_secure_password

  validates :email, uniqueness: true, on: :create
  validates :password, length: {minimum: 8}, on: :create
  validates :first_name, presence: true, on: :create
  validates_confirmation_of :password, on: :create

  def full_name
    "#{self.first_name} #{self.last_name || ''}"

  end

  def most_recent_board
    self.all_boards.order('updated_at DESC').first
  end

  def track_card_update(card, object)
    case object
    when :list
      value = card.list.title
    when :title
      value = card.title
    when :description
      value = card.description
    end
    self.activities.create(card: card, object: object, verb: 'update', value: value)
  end

  def track_card_creation(card)
    self.activities.create(card: card, object: 'card', verb: 'create', value: card.list.title)
  end

  def track_add_card_member(card, user)
    self.activities.create(card: card, object: 'membership', verb: 'create', value: user.full_name)
  end

  def track_remove_card_member(card, user)
    self.activities.create(card: card, object: 'membership', verb: 'destroy', value: user.full_name)
  end





end
