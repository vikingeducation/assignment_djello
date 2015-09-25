class MembershipsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_access
  def create
    @card = Card.find_by_id(params[:card_id].to_i)
    @new_member = User.find_by_id(params[:user_id].to_i)

    respond_to do |format|
      if @card.members.include? @new_member
        format.json {render json: {errors: ["User already exists on list."]}, status: 403}
      else
        @card.members.push(@new_member)
        @activity = Activity.create(recordable: @card, message: "Added member #{@new_member.username}!")
        format.json { render json: {member: @new_member, activity: @activity } }
      end
    end
  end

  def destroy
    member = User.find_by(id: params[:user_id].to_i)
    card = Card.find_by(id: params[:card_id].to_i)
    membership = Membership.find_by(user_id: params[:user_id].to_i, card_id: params[:card_id].to_i)
    @cached_membership = membership
    if member and card and membership.destroy
      @activity = Activity.create(recordable: card, message: "Removed member #{member.username}.")
      respond_to do |format|
        format.json { render json: {member: @cached_membership, activity: @activity} }
      end
    end
  end
  private
    # You can access a card if it's on a board you own or if you're
    # a member of the exact card.
    def require_access
      if !(current_user.owned_card_ids.include? params[:card_id].to_i)
        respond_to do |format|
          format.json {render json: {errors: ["You must be the owner of this content!"]}, status: 403}
        end
      elsif !User.find_by_id(params[:user_id].to_i)
        respond_to do |format|
          format.json {render json: {errors: ["Specified user does not exist"]}, status: 403}
        end
      end
    end
end
