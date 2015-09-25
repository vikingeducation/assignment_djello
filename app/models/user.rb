class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :boards, dependent: :destroy
  has_many :lists, through: :boards

  has_many :memberships
  has_many :cards, through: :memberships, source: 'card'

  def owned_card_ids
    query = <<-SQL
    SELECT cards.id
      FROM users
      INNER JOIN boards on boards.user_id = ?
      INNER JOIN lists on lists.board_id = boards.id
      INNER JOIN cards_lists on cards_lists.list_id = lists.id
      INNER JOIN cards on cards.id = cards_lists.card_id
    SQL
    (Card.find_by_sql [query, self.id]).map {|el| el.id }.uniq
  end

  def all_boards
    base_boards = self.boards

    query = <<-SQL
    SELECT DISTINCT(boards.*)
    FROM boards
    INNER JOIN lists on lists.board_id = boards.id
    INNER JOIN cards_lists on cards_lists.list_id = lists.id
    INNER JOIN cards on cards.id = cards_lists.card_id
    INNER JOIN memberships on memberships.card_id = cards.id
    WHERE memberships.user_id = ?
    SQL

    return (base_boards + (Board.find_by_sql [query, self.id])).uniq
  end

  # A user can view a board if they own it or have any cards where they
  # are a member
  def can_view? (board_id)
    query = <<-SQL
    SELECT memberships.*
      FROM boards
      INNER JOIN lists on lists.board_id = boards.id
      INNER JOIN cards_lists on cards_lists.list_id = lists.id
      INNER JOIN cards on cards.id = cards_lists.card_id
      INNER JOIN memberships on memberships.card_id = cards.id
    WHERE boards.id = ? AND memberships.user_id = ?
    SQL
    (Board.find_by_sql [query, board_id, self.id]).length > 0
  end

  def email_required?
   false
  end

  def email_changed?
   false
  end
end
