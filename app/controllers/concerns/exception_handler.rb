module ExceptionHandler
  # provides the more graceful `included` method
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound do |e|
      head :not_found
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      head :unprocessable_entity
    end

    rescue_from ActionController::ParameterMissing do
      head :bad_request
    end

    rescue_from ActionController::UrlGenerationError do
      head :not_found
    end
  end
end
