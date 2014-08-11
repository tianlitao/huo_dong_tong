/**
 * Created by tlt on 14-6-21.
 */
angular.module('angularApp')
    .controller('CreateActivityCtrl', function ($scope) {
        $scope.create = function () {
            var activities = JSON.parse(localStorage.getItem("activities")) || [];
            Activity.judge_check_rename($scope)
        }
        $scope.show = Activity.check_activity_list_exist()
    });
