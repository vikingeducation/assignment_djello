module Request

  module AuthHelpers
    def auth_headers(user)
      token = Knock::AuthToken.new(payload: { sub: user.id }).token
      {
        'Authorization': "Bearer #{token}"
      }
    end

    def bad_auth_headers(user)
      token = Knock::AuthToken.new(payload: {sub: user.id}).token
      {
        'Authorization': 'Bearer xyz'
      }
    end
  end
end
