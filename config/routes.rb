Rails.application.routes.draw do
  resources :images, only: [:create, :show] do
    post "flag", on: :member
  end
end
