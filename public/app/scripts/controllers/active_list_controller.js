/**
 * Created by tlt on 14-6-21.
 */
angular.module('angularApp')
    .controller('ActivityListCtrl', function ($scope, $location, $http) {
        $scope.bid = function (activity) {
            $location.path('bidding')
            Activity.save_click_activity(activity)
        }
        console.log(Activity.get_activities())
        $scope.upload = function () {
            for (var i in Activity.get_activities()) {
                    $http.post('/upload.json', {"user": localStorage.user, "activity_name": Activity.get_activities()[i].name, "apply_list": Activity.get_activities()[i].apply_list}).success(function (back) {
                        console.log(1)
                        if (back == 'true') {
                            alert("成功")
                        }
                    })
                }
            }
        $scope.activities = Activity.get_activities()
        console.log(Activity.check_activity_list_exist())
        if (Activity.check_activity_list_exist().length == 0) {
            $location.path('create_activity')
        }
    }
)
