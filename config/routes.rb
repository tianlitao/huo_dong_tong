Rails.application.routes.draw do
  get 'passwords/forgot_passwords'

  get 'admin/modify_passwords'

  get 'users/backstage'
  root to: "users#login"
  get "/modify_passwords" => "admin#modify_passwords", :as => "modify_password"
  get "/signup" => "users#signup", :as => "signup"
  get "/login" => "users#login", :as => "login"
  get "/welcome" => "users#welcome", :as => "welcome"
  get "/add_user" => "users#add_user", :as => "add_user"
  get "/manager_index" => "users#manager_index", :as => "manager_index"
  get "/forget_one" => "passwords#forget_one", :as => "forget_one"
  get "forget_two" => "passwords#forget_two"
  get "forget_three" =>"passwords#forget_three"
  get "bid" =>"users#bid"
  get "bid_message" => "users#bid_message"
get "display" => "users#display"
get "status_post" =>"users#status_post"
  get "dis" => "users#dis"
  post "status_post" =>"users#status_post"
post "forget_three" => "passwords#next_three"
  post "admin/modify_passwords" => "users#change_password"
  post "/modify_passwords" => "admin#modify_passwords"
  get "/price_count" =>"users#price_count"
 # get "upload" => "users#upload"
 # post "/change_password" => "users#change_password"
  #post "/add_user" =>"users#add_user"
  post "/upload" => "users#upload"
  post "/user_login" => "users#user_login"
  post "next_one" => "passwords#next_one"
  post "next_two" => "passwords#next_two"
  post "/create_login_session" => "users#create_login_session"
  delete "delete_user" => "admin#delete_user", :as => "delete_user"
  delete "logout" => "users#logout", :as => "logout"
  delete "logoutuser" => "users#logoutuser"
  get "apply" => "users#apply"
  resources :users, only: [:create]
  resources :admin
  resources :passwords

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
