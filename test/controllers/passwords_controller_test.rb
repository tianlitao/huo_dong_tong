require 'test_helper'

class PasswordsControllerTest < ActionController::TestCase
  test "should get forgot_passwords" do
    get :forgot_passwords
    assert_response :success
  end

end
