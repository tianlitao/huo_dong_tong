#encoding:utf-8
class UsersController < ApplicationController

  def forget_one
  end

  def next_one
    cookies[:name]=params[:name]
    if User.find_by_name(params[:name])
      redirect_to :forget_two
    else
      if params[:name]==""
        @err="不能为空"
        render :forget_one
      else
        @err="账户名不存在"
        render :forget_one
      end
    end
  end

  def forget_two
    session[:question]=User.find_by_name(cookies[:name]).question


  end

def next_two
  @user=params[:answer]
  @use=User.find_by_name(cookies[:name]).answer

  if  params[:answer]==User.find_by_name(cookies[:name]).answer
    render :forget_three
  else
    render :forget_two
  end

end


def add_user
  @user=User.new
end

def manager_index
  session[:name]=""
  if  current_user
    user=User.where(:admin => "f")
    @user=user.paginate(page: params[:page], per_page: 10)
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
    @a=1
    render :modify_password

  else
    flash[:error]="两次密码输入不一致"
    redirect_to :modify_password
  end

end

def modify_password
  # @user = User.get_activity(params[:name])
  if session[:name] == ""
    session[:name]= params[:name]

  end

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
