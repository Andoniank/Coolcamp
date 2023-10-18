Rails.application.routes.draw do
  namespace :api do
    get 'reservations/index'
    get 'reservations/show'
    get 'reservations/create'
    get 'reservations/destroy'
    get 'reservations/update'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resources :campsites, only: [:index, :show]
    resources :reservations, only: [:index, :show, :create, :destroy, :update]
    resource :session, only: [:show, :create, :destroy]
  end
  get '*path', to: "static_pages#frontend_index"
end
