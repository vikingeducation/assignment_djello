class MainController < ApplicationController
  respond_to :json

  def index
    if current_user.all_boards.empty?
      return head :not_found
    else
      @user = User.includes(board_memberships: {board: {lists: [:cards]}}).where(id: current_user.id).first
      @current_board = @user.most_recent_board
    end
  end
end
