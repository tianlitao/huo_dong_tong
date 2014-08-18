/**
 * Created by tlt on 14-6-21.
 */
angular.module('angularApp')
    .controller('ActivityListCtrl', function ($scope, $location, $http) {
        $scope.bid = function (activity) {
            $location.path('bidding')
            Activity.save_click_activity(activity)
        }
        $scope.upload = function () {
            $http.post('/upload.json', {"user": localStorage.user, "post": Activity.post_message(), "activity": Activity.activity_message(), "bid": Activity.post_bid(), "bid_list": Activity.post_bid_list(),"price_count":Activity.price_count(),"display":Activity.message_display()}).success(function (back) {
                if (back == 'true') {
                    alert("成功")
                }
            })
        }
        $scope.activities = Activity.get_activities()
        console.log(Activity.check_activity_list_exist())
        if (Activity.check_activity_list_exist().length == 0) {
            $location.path('create_activity')
        }
    }
)
