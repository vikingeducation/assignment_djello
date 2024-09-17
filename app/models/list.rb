class List < ApplicationRecord
  belongs_to :board
  has_many :cards,  -> {order('position ASC')}, dependent: :destroy
  has_many :memberships, through: :cards, dependent: :destroy

  validates :title, presence: true

  accepts_nested_attributes_for :cards
end
