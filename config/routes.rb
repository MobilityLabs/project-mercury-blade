Rails.application.routes.draw do
  resources :images, param: :uuid, only: [:create, :show] do
    post "flag", on: :member
    post "add_comment", on: :member
  end
end
