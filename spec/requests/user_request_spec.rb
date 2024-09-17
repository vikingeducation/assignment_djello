require 'rails_helper'

describe 'UserRequests' do
  let(:user){ create(:user)}
  let(:valid_user){ build(:user)}

  describe 'GET #index' do

    it 'returns unauthorized without auth token' do
      get users_path
      expect(response).to have_http_status :unauthorized
    end
    it 'returns unauthorized with wrong token' do
      get users_path, headers: bad_auth_headers(user)
      expect(response).to have_http_status(:unauthorized)
    end
    it 'returns ok with valid auth token' do
      get users_path, headers: auth_headers(user)
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST #create' do
    before do
      user
    end
    context 'when email is registered' do
      it 'returns conflict' do
        post users_path, params: {user: {email:user.email, password: 'password', first_name: user.first_name, password_confirmation: 'password'}}
        expect(response).to have_http_status :conflict
      end
    end
    context 'when email is not registered' do
      it 'returns ok' do
        post users_path, params: {user: {email: valid_user.email, password: 'password', password_confirmation: 'password', first_name: valid_user.first_name}}
        expect(response).to have_http_status :ok
      end
    end
    context 'when password is too short' do
      it 'returns unprocessable_entity' do
        post users_path, params:{user: {email: valid_user.email, password: 'a', password_confirmation: 'a', first_name: valid_user.first_name}}
        expect(response).to have_http_status :unprocessable_entity
      end
    end
    context 'when password is right length' do
      it 'returns ok' do
        post users_path, params:{user: {email: valid_user.email, password: '12345678', password_confirmation: '12345678', first_name: valid_user.first_name}}
        expect(response).to have_http_status :ok
      end
    end
  end
end
