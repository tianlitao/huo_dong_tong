angular.module('angularApp')
    .controller('BiddingSignUpCtrl', function ($scope, $location,$http) {
        $scope.break = function () {
            $scope.biddings = Bid.check_current_activity_bid()
            $scope.people = Bid.check_current_activity_bid().length
            $scope.name = localStorage.bid
//            $http.post('/upload.json', {"user": localStorage.user, "post": Activity.post_message(), "activity": Activity.activity_message(), "bid": Activity.post_bid(), "bid_list": Activity.post_bid_list(),"price_count":Activity.price_count(),"display":Activity.message_display()})
        }
        $scope.break();
        $scope.bid_start = true
        Bid.check_bid_start($scope)
        $scope.end = function () {
            if (confirm("确定要结束吗")) {
                Bid.check_current_activity_save_bid_color()
                console.log(Activity.display_success())
                $http.post(server+'/status_post.json', {"user": localStorage.user,"bid": Activity.post_bid(),"post": Activity.post_message(),"display":Activity.display_success()})
                $location.path('bid_result')
            }
        }
        $scope.back = function () {
            $location.path('bidding_now')
        }
        $scope.display=function(){
            $http.post(server+'/upload.json', {"post":Activity.post_message(),"user": localStorage.user,"bid": Activity.post_bid(), "bid_list": Activity.post_bid_list(),"price_count":Activity.price_count(),"display":Activity.message_display()})
        }
    })