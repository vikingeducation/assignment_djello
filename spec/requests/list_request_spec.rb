require 'rails_helper'

describe 'ListRequests' do
  let(:user){ create(:user)}
  let(:board){ create(:board, owner: user)}
  let(:list){ create(:list, board: board)}

  describe '#update' do
    before do
      list
    end

    it 'returns unauthorized without auth token' do
      put list_path(list.id)
      expect(response).to have_http_status :unauthorized
    end
    it 'returns unauthorized with wrong token' do
      put list_path(list.id), headers: bad_auth_headers(user)
      expect(response).to have_http_status(:unauthorized)
    end
    it 'returns :bad_request if params missing' do
      put list_path(list.id), headers: auth_headers(user)
      expect(response).to have_http_status(:bad_request)
    end
    it 'returns :not_found if no board found' do
      put list_path(999), headers: auth_headers(user)
      expect(response).to have_http_status(:not_found)
    end
    it 'updates list with valid token and no missing params' do
      put list_path(list.id), headers: auth_headers(user),  params: {list: {title: 'A'}}
      list.reload
      expect(response).to have_http_status(:ok)
      expect(list.title).to eq('A')
    end
  end

  describe '#create' do
    it 'does not create a list if title is missing' do
      post board_lists_path(board.id), headers: auth_headers(user)
      expect(response).to have_http_status(:bad_request)
    end
    it 'creates a list with proper params' do
      expect{ post board_lists_path(board.id), headers: auth_headers(user), params: {list: {title: 'New list'}} }.to change(List, :count).by(1)
      expect(response).to have_http_status(:ok)
    end
  end

  describe '#destroy' do
    it 'does not destroy list if unauthorized' do
      delete list_path(list.id), headers: bad_auth_headers(user)
      expect(response).to have_http_status(:unauthorized)
    end
    it 'returns not_found if list does not exist' do
      delete list_path(999), headers: auth_headers(user)
      expect(response).to have_http_status(:not_found)
    end
    context 'authorized' do
      it 'successfully destroys list' do
        delete list_path(list.id), headers: auth_headers(user)
        expect(response).to have_http_status(:no_content)
      end
    end
  end
end
