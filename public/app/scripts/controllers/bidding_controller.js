/**
 * Created by tlt on 14-6-21.
 */
angular.module('angularApp')
    .controller('BiddingCtrl', function ($scope, $location) {
        $scope.diaoyong = function () {
            $scope.applys = Bid.get_apply_list(localStorage.current_activity)
        }
        $scope.diaoyong();
        $scope.end = function () {
            if (confirm("你确定结束吗")) {
                $scope.apply_status = "2"
                Bid.save_activity_status_false(localStorage.current_activity)
                    $scope.disabled = false
                   $location.path('bidding_now')
            }
        }
        $scope.begain = function () {
            $scope.apply_status = "1"
            Bid.save_activity_status(localStorage.current_activity)
        }
        $scope.apply_status = "2"
        Bid.judege_check_current_activity_activity_status($scope)
        Bid.judge_check_bid_status_activity_status($scope)
    }
)
