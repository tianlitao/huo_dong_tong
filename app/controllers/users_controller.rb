#encoding:utf-8
class UsersController < ApplicationController
  User.all[0]={:id => 0, :name => "admin", :password_digest => "admin"}
  def add_user
    @user=User.new
  end
  def manager_index
    if  current_user
      @user=User.paginate(page: params[:page], per_page: 10).offset(1)
      if params[:page].to_i==0
        @us=1
      else
        @us=params[:page].to_i
      end
    else
      redirect_to :login
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
    user = User.get_activity(session[:name])


    # @user.password_digest=params[:user][:password_digest]
    user.password = params[:user][:password]
    user.password_confirmation = params[:user][:password_confirmation]
    if user.password==user.password_confirmation
      user.save
      redirect_to :manager_index
    else
      @u=true
     # redirect_to :modify_password
    end
    # if user.save
    #   redirect_to :manager_index
    # else
    #   redirect_to :modify_password
    # end
  end
  def modify_password
    session[:name]= params[:name]
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
      if user.admin == true
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
