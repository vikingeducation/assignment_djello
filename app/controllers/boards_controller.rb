class BoardsController < ApplicationController

  def index
    @boards = current_user.boards
    respond_to do |format|
      format.json { render json: @boards, status: 200 }
    end
  end

  def create
    puts params
    @board = current_user.boards.new(board_params)
    if @board.save
      respond_to do |format|
        format.json { render json: @board, status: 200 }
      end
    else
      respond_to do |format|
        format.json { render json: @board.errors }
      end
    end
  end

  def destroy
    puts 'TRYING TO DESTROY'
    puts params[:id]
    board = @board = current_user.boards.where("id = ?", params[:id])[0]
    if @board.destroy
      respond_to do |format|
        format.json { render json: board, status: 200 }
      end
    else
      respond_to do |format|
        format.json { render json: @board.errors }
      end
    end
  end


  private

  def board_params
    params.require(:board).permit(:title, :description, :team_id)
  end

end
