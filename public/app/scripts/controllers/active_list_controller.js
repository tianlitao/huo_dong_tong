/**
 * Created by tlt on 14-6-21.
 */
angular.module('angularApp')
    .controller('ActivityListCtrl', function ($scope, $location,$http) {
        $scope.bid = function (activity) {
            $location.path('bidding')
            Activity.save_click_activity(activity)
        }
        $scope.upload=function(){
            $http.post('/upload.json',Activity.check_activity_list_exist()).success(function(back){
                if(back==true){
                    alert("成功")
                }
            })
        }
        $scope.activities = Activity.get_activities()
        console.log(Activity.check_activity_list_exist())
        if (Activity.check_activity_list_exist().length==0) {
            $location.path('create_activity')
        }
    }
)
