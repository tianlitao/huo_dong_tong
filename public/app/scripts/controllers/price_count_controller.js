/**
 * Created by tlt on 14-7-15.
 */
angular.module('angularApp')
    .controller('PriceCountCtrl', function ($scope, $location) {
        localStorage.status = true
        $scope.refreshes = function () {
            var bid_price = JSON.parse(localStorage.getItem("bid_price"))
            var bidding=Bid.check_current_activity_bid()
            $scope.name=localStorage.bid
            $scope.biddings=bid_price
            $scope.people=bidding.length
            Bid.judge_check_bid_price_bid_count_current_activity_bid_messages_bid_price($scope)
        }
        $scope.refreshes()
        $scope.back = function () {
            localStorage.status == false
            $location.path('bidding_now')
        }
    });

