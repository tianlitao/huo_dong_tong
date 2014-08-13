angular.module('angularApp')
    .controller('LoginCtrl', function ($scope, $location, $http) {
        $scope.login = function () {
            $scope.display = "false"
            $http.post(server+'/user_login.json', {"username": $scope.username, "password": $scope.user}).success(function (back) {
                if (back == 'true') {
                    localStorage.user=$scope.username
                    Activity.localstorage_clear()
                    $location.path('activity_list')
                }
                else {
                    $scope.display = "true"
                }
            })
        }
    });
