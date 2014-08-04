#encoding:utf-8
class UsersController < ApplicationController
  def add_user
    @user=User.new
  end
  def manager_index
    @user=User.paginate(page: params[:page],per_page:11)
  end
  def welcome
  end
  def login
  end
  def signup
    @user=User.new
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
      redirect_to :root
    else
      render :signup
    end
  end
end
