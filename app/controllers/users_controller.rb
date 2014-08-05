#encoding:utf-8
class UsersController < ApplicationController
  def add_user
    @user=User.new
  end

  def manager_index
    @user=User.paginate(page: params[:page], per_page: 11)
    if params[:page].to_i==0
      @us=1
    else
      @us=params[:page].to_i
    end

  end

  def welcome
  end

  def login
  end

  def signup
    @user=User.new
  end

  def change_password
    @user = User.get_activity(params[:name])
    # @user.password = params[:name]
    # @user.password_confirmation = params[:user][:password_confirmation]
  end

  def modify_password
    @user = User.get_activity(params[:name])
  end

  def delete_user
    User.get_activity(params[:name]).delete
    redirect_to :manager_index
  end

  # def get_activity(name)
  #   User.find_by_name(name)
  # end
  def logout
    cookies.delete(:token)
    redirect_to :login
  end

  def create_login_session
    user =User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      cookies.permanent[:token]=user.token
      if user.name == "admin"
        redirect_to :manager_index
      else
        redirect_to :welcome
      end
    else
      flash[:error]="无效的用户名或密码"
      redirect_to :login
    end
  end

  def create
    @user=User.new(params[:user])
    if @user.save
      if current_user
        if current_user.name == "admin"
          # cookies.permanent[:token]= @user.token
          redirect_to :add_user
        end
      else
        cookies.permanent[:token]= @user.token
        render :welcome
      end
    else
      if current_user
        if current_user.name == "admin"
          render :add_user
        end
      else
        render :signup
      end
    end
  end
end
