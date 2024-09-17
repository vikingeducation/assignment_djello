class ListsController < ApplicationController

  def update
    @list = List.includes(:cards).find(params[:id])
    if @list.update(whitelisted_params)
      render :show
    end
  end

  def create
    @board = Board.find(params[:board_id])
    @list = @board.lists.build(whitelisted_params)
    if @list.save
      render :show
    else
      return head :bad_request
    end
  end

  def destroy
    @list = List.includes(cards: [:memberships]).find(params[:id])
    if @list.destroy
      return head :no_content
    end
  end

  private

  def whitelisted_params
    params.require(:list).permit(:title, :description, :board_list, cards_attributes: [:id, :position])
  end
end
