require 'rails_helper'

# before do
#      get boards_path, headers: auth_headers(user)
#    end


describe 'MainRequests' do
  let(:user){ create(:user)}
  let(:board){ create_list(:board, 3, owner: user)}

  describe 'authorization' do
    it 'responds with unauthorized if invalid or missing token' do
      get main_path, headers: bad_auth_headers(user)
      expect(response).to have_http_status(:unauthorized)
      get main_path
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'authorized' do
    context 'user has no boards' do
      it 'responds with not_found' do
        get main_path, headers: auth_headers(user)
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'user has boards' do
      before do
        board
        get main_path, headers: auth_headers(user)
      end

      it 'responds with :ok if user has boards' do
        expect(response).to have_http_status(:ok)
      end

      # it 'returns the most recently modified board' do
      #   body = JSON.parse(response.body)
      #   current= body['current']
      #   expect(current.blank?).to eq(false)
      #   last_updated = body['board_list'].sort_by do |board|
      #     board['updated_at']
      #   end
      #   expect(current['id']).to eq(last_updated.last['id'])
      # end

    end
  end
end
