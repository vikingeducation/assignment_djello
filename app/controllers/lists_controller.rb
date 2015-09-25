class ListsController < ApplicationController

  def create
    @list = List.new(whitelist_list_params)

    respond_to do |format|
      if @list.save
        format.json {render json: @list }
      else
        format.json {render status: :unprocessable_entity}
      end
    end

  end

  def show
    @list = List.find(params['id'])

    respond_to do |format|
      if @list
        format.json { render json: @list }
      else
        format.json { render status: :unprocessable_entity }
      end
    end

  end


  def update
    @list = List.find(params['id'])

    respond_to do |format|
      if @list.update(whitelist_list_params)
        format.json { render json: @list }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end


  def destroy
    @list = List.find(params['id'])

    respond_to do |format|
      if @list.destroy
        @lists = List.all
        format.json { render json: @lists }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  private

  def whitelist_list_params
    params.require(:list).permit(:board_id, :title, :description)
  end

end
