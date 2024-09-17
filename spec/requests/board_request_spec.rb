require 'rails_helper'

describe 'BoardRequests' do
  let(:user){ create(:user)}
  let(:alt_user){ create(:user)}
  let(:boards){ create_list(:board, 3, owner: user)}
  let(:title){ 'A title'}

  describe '#update' do
    context 'when user is logged out' do
      it 'returns unauthorized if incorrect or no token' do
        boards
        put board_path(boards.first.id)
        expect(response).to have_http_status(:unauthorized)
        put board_path(boards.first.id), headers: bad_auth_headers(user)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user is logged in' do

      it 'returns :ok' do
        boards
        new_title = 'Updated!'
        put board_path(boards.first.id), headers: auth_headers(user), params: {board: {title: new_title}}
        boards.first.reload
        expect(response).to have_http_status(:ok)
        expect(boards.first.title).to eq(new_title)
      end
    end
  end

  describe '#destroy' do

    context 'when incorrect token provided' do
      before do
        boards
      end
      it 'returns unauthorized' do
        delete board_path(boards.first.id)
        expect(response).to have_http_status(:unauthorized)
        delete board_path(boards.first.id), headers: bad_auth_headers(user)
        expect(response).to have_http_status(:unauthorized)
      end
      it 'returns no_content on successful deletion' do
        delete board_path(boards.first.id), headers: auth_headers(user)
        expect(response).to have_http_status(:no_content)
      end
    end
    context 'when board is successfully destroyed' do
      before do
        boards
      end
      it 'deletes all associated board member records' do
        expect{delete board_path(boards.first), headers: auth_headers(user)}.to change(BoardMembership, :count).by(-1)
      end
    end
  end


  describe '#show' do
    context 'when user is logged out' do
      before do
        boards
      end
      it 'returns unauthorized if incorrect or no token' do
        get boards_path(boards.first.id)
        expect(response).to have_http_status :unauthorized
        get boards_path(boards.first.id), headers: bad_auth_headers(user)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user is logged in' do
      before do
        boards
      end
      it 'returns ok with proper token' do
        get board_path(boards.first.id), headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end
      it 'returns :not_found if user does not own' do
        get board_path(boards.first.id), headers: auth_headers(alt_user)
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when user is not a member of a board' do
      before do
        boards
      end
      it 'returns not_found' do
        get board_path(create(:board)), headers: auth_headers(create(:user))
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe '#create' do
    context 'when invalid token provided' do
      it 'returns :unauthorized if invalid token provided' do
        post boards_path(),  headers: bad_auth_headers(user), params: {board: {title: 'A new board'}}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context 'when valid token provided' do
      it 'creates a board' do
        title = 'A new board'
        expect{post boards_path, params: {board: {title: title}}, headers: auth_headers(user)}.to change(Board, :count).by(1)
        expect(Board.last.title).to eq(title)
      end
    end
    context 'when board is successfully created' do
      it 'creates a BoardMembership record' do
        expect{post boards_path, params: {board: {title: title}}, headers: auth_headers(user)}.to change(BoardMembership, :count).by(1)
      end
    end
    context 'when board creation fails' do
      it 'does not create a BoardMembership record' do
        expect{post boards_path,  headers: auth_headers(user)}.not_to change(BoardMembership, :count)
      end
    end
  end



end
