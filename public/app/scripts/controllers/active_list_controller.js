/**
 * Created by tlt on 14-6-21.
 */
angular.module('angularApp')
    .controller('ActivityListCtrl', function ($scope, $location) {
        $scope.bid = function (activity) {
            $location.path('bidding')
            Activity.save_click_activity(activity)
        }
        $scope.activities = Activity.get_activities()
        if (!Activity.check_activity_list_exist()) {
            $location.path('create_activity')
        }
    }
)
