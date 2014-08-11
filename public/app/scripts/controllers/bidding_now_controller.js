/**
 * Created by tlt on 14-6-30.
 */
/**
 * Created by tlt on 14-6-21.
 */
angular.module('angularApp')
    .controller('BiddingNowCtrl', function ($scope, $location) {
        Bid.judge_check_bid_status($scope)
        $scope.activity = Bid.check_current_activity_bid_list()
        Bid.judge_check_activity_status_length($scope)
        $scope.bid = function (bidding) {
            $location.path('bidding_sign_up')
            localStorage.bid = bidding
        }
        $scope.begain = function () {
            $location.path('bidding_sign_up')
                Bid.save_bid_status_bid_message()
        }
    });
