class CardsController < ApplicationController
  respond_to :json
  before_action :check_membership, only: [:show, :update, :destroy]


  def create
    @list = List.find(params[:list_id])
    @card = @list.cards.build(whitelisted_params)
    if @card.save
      current_user.track_card_creation(@card)
      render :show
    else
      head :unprocessable_entity
    end
  end

  def show
    render :show
  end

  def update
    if @card.update(whitelisted_params)
      current_user.track_card_update(@card, update_object)
      render :show
    else
      head :unprocessable_entity
    end
  end

  def destroy
    @card = Card.includes(:list).find(@card.id)
    if @card.destroy
      head :no_content
    end
  end

  private

  def whitelisted_params
    params.require(:card).permit(:title, :description, :list_id)
  end

  def update_object
    return :title if whitelisted_params[:title]
    return :description if whitelisted_params[:description]
    return :list if whitelisted_params[:description]
  end

  def check_membership
    @card = Card.find_by(id: params[:id])
    return head :not_found unless @card
    return head :unauthorized unless @card.board.board_members.include?(current_user)
  end



end
