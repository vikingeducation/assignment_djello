class ApplicationController < ActionController::API
  include Knock::Authenticable
  include ExceptionHandler
  before_action :authenticate_user
  respond_to :json
end
