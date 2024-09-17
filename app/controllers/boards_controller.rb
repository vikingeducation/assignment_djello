class BoardsController < ApplicationController
  respond_to :json
  # after_action :add_user_as_board_member, only: [:create], if: -> {@board}

  def show
    return head :not_found unless BoardMembership.where(board_id: params[:id], user_id: current_user.id).exists?
    @board = Board.includes({lists: [:cards]}).where(id: params[:id]).first
    if @board
      @user = current_user
      return render :show
    else
      return head :not_found
    end

  end

  def update
    @board = Board.includes(:owner, lists: [:cards] ).where(id: params[:id])
    if @board.update(whitelisted_params)
      @board = @board.first
      @user = @board.owner
      render :show
    else
      return head :unprocessable_entity
    end
  end

  def destroy
    @board = Board.find(params[:id])
    return head :not_found if @board.blank?
    if @board.destroy
      return head :no_content
    else
      return head :internal_server_error
    end
  end

  def create
    @board = current_user.boards.build(whitelisted_params)
    if @board.save
      @user = current_user
      render :show
    else
      return head :bad_request
    end
  end

  private

  def whitelisted_params
    params.require(:board).permit(:title, :description)
  end



end
