class Board < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'user_id'
  has_many :lists, dependent: :destroy
  has_many :cards, -> {order('position ASC')}, through: :lists
  has_many :board_memberships, dependent: :destroy
  has_many :board_members, through: :board_memberships, source: :user, dependent: :destroy
  after_create :create_board_membership

  include Reusable

  validates :title, presence: true
end
