class AdminController < ApplicationController
  def modify_passwords
    if session[:name] == ""
      session[:name]=params[:name]
    end
  end
  def delete_user
    User.get_activity(params[:name]).delete
    redirect_to :manager_index
  end
end
