Rails.application.routes.draw do

  root 'static_pages#index'

  devise_for :users, controllers: {
        sessions: 'users/sessions'
      }
      devise_scope :user do
        get "sign_up", to: 'devise/registrations#new'
        get "sign_in", to: "devise/sessions#new"
        get "login", :to => "devise/sessions#new"
        delete "sign_out", :to => "devise/sessions#destroy"
        delete "logout", :to => "devise/sessions#destroy"
      end 


  scope :api do
    scope :v1 do
      resources :boards, only: [:index, :create, :destroy, :update]
      resources :users, only: [:show]
      resources :lists, only: [:create, :update, :destroy]
      resources :cards, only: [:create, :show, :update, :destroy]
    end
  end


end
