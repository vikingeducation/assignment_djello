class Activity < ApplicationRecord
  belongs_to :user
  belongs_to :card

  validates :verb, :object, presence: true

end
