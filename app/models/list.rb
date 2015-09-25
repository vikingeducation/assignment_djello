class List < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :board
  has_and_belongs_to_many :cards

  default_scope {includes(:cards)}
end
