class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def index
    @user = current_user
  end

  def create
    @user = User.new(whitelisted_params)
    if @user.save
      @token = Knock::AuthToken.new(payload: { sub: @user.id}).token
      render :show
    else
      return head :conflict if User.find_by(email: @user.email) && User.find_by(email: @user.email).persisted?
      head :unprocessable_entity if @user.new_record?
    end
  end

  private

  def whitelisted_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name)
  end
end
