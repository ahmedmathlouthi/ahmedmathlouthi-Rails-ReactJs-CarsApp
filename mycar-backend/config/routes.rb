Rails.application.routes.draw do
  namespace 'api' do
    resources :cars do  
      resources :tasks do
        resources :notes
      end
    end
  end
end
