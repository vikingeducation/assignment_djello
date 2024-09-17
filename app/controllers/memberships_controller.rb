class MembershipsController < ApplicationController

  def destroy
    @membership = Membership.find_by(user_id: params[:id], card_id: params[:card_id])
    return head :not_found unless @membership
    if @membership.destroy
      current_user.track_remove_card_member(@membership.card, @membership.user)
      render :show, status: :accepted
    else
      return head :unprocessable_entity
    end
  end

  def create
    @membership = Membership.new(user_id: params[:user_id], card_id: params[:card_id])
    if @membership.save
      current_user.track_add_card_member(@membership.card, @membership.user)
      render :show
    end
  end


end
