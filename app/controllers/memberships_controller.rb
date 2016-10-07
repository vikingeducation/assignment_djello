class MembershipsController < ApplicationController

  def create
    @membership = Membership.new
    @membership.card_id = params[:cardID]
    @membership.user_id = params[:userID]
    if @membership.save
      respond_to do |format|
        format.json {render json: @membership, status: 200}
      end
    end
  end

end
