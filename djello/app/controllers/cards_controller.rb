class CardsController < ApplicationController



  def create
    @card = Card.new(params_list)
    respond_to do |format|
      if @card.save
        format.json {render json: @card}
      else
        format.json {render status: :unprocessable_entity}
      end
    end
  end

  def show
    @card = Card.find(params['id'])
    respond_to do |format|
      format.json {render json: @card.to_json(include: :members) }
      
    end
  end

  def update
    @card = Card.find(params["id"])
    respond_to do |format|
      if @card.update(params_list)
        format.json {render json: @card}
      else
        format.json {render status: :unprocessable_entity}
      end
    end
  end

  def destroy
    @card = Card.find(params["id"])
    respond_to do |format|
      if @card.destroy
        format.json {head :ok}
      else
        format.json {render status: :unprocessable_entity}
      end
    end
  end

  private

  def params_list
    params.require(:card).permit(:title, :description, :list_id, :id)
  end


end
