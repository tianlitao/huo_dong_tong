require 'test_helper'

class AdminControllerTest < ActionController::TestCase
  test "should get modify_passwords" do
    get :modify_passwords
    assert_response :success
  end

end
