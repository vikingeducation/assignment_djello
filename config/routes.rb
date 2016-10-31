Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'djello#index'

  resource :djello, only: [:index]

  scope :api do
    scope :v1 do
      resources :boards
      resources :lists, only: [:create, :update, :destroy]
      resources :cards, only: [:create, :update, :destroy]
      resources :users, only: [:index, :show]
      resources :memberships, only: [:index, :create, :destroy]
    end
  end
end
