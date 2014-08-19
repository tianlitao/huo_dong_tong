#encoding:utf-8
class PasswordsController < ApplicationController
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
  def forget_three
    @user=User.find_by_name(cookies[:name])
  end

  def next_two
    if  params[:answer] == User.find_by_name(cookies[:name]).answer
      redirect_to :forget_three
    else
      if params[:answer] ==""
        @error="不能为空"
        render :forget_two
      else
        @error="答案不正确"
        render :forget_two
      end
    end
  end

  def next_three
    if cookies[:name]
      user = User.find_by_name(cookies[:name])
      user.password = params[:user][:password]
      user.password_confirmation = params[:user][:password_confirmation]
      if user.password==user.password_confirmation
        cookies.permanent[:token]=user.token
        user.save
        cookies.delete(:name)
        redirect_to :welcome
      else
        if params[:user][:password]=="" || user.password_confirmation==""
          @error="不能为空"
          render :forget_three
        else
          @error="密码不一致"
          render :forget_three
        end
      end
    else
      redirect_to :login
    end
  end

end
