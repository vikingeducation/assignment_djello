class BoardsController < ApplicationController

  before_action :authenticate_user!

  def index
    puts "=================action index in board ctrl================"
    puts current_user.boards
    @boards = current_user.boards
    respond_to do |format|
      format.json {render json: @boards}
    end
  end

  def create
    @board = Board.new(params_list)
    @board.user_id = current_user.id
    respond_to do |format|
      if @board.save
        format.json {render json: @board}
      else
        format.json {render status: :unprocessable_entity}
      end
    end
  end

  def update
    @board = Board.find(params["id"])
    respond_to do |format|
      if @board.update(params_list)
          format.json {render json: @board}
      else
          format.json {render status: :unprocessable_entity}
      end
    end
  end

  def show

    @board = Board.find(params["id"])
    @lists = List.where(:board_id => @board.id)
    puts "===================!!!!!!!!!!===================="
    puts @lists

    respond_to do |format|
      format.json {render json:
                      {:board => @board.to_json(:include => :lists),
                      :lists => @lists.to_json(:include => :cards)}
                   }

      # {render json: @board.to_json(:include => {:lists => :cards)}

      # # @venue.to_json(:include => {:published_events => {:method => :to_param}})
    end
  end

  private

  def params_list
    params.require(:board).permit(:title, :user_id, :id)
  end
end
