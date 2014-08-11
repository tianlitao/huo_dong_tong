'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/create_activity', {

        templateUrl: 'views/create_activity.html',
        controller: 'CreateActivityCtrl'
      })
      .when('/bidding_sign_up', {

            templateUrl: 'views/bidding_sign_up.html',
            controller: 'BiddingSignUpCtrl'
        })
        .when('/bid_result', {

            templateUrl: 'views/bid_result.html',
            controller: 'BidResultCtrl'
        })
        .when('/price_count', {

            templateUrl: 'views/price_count.html',
            controller: 'PriceCountCtrl'
        })
      .when('/bidding', {
        templateUrl: 'views/bidding.html',
        controller: 'BiddingCtrl'
      })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
      .when('/bidding_now', {
            templateUrl: 'views/bidding_now.html',
            controller: 'BiddingNowCtrl'
        })
        .when('/activity_list', {
            templateUrl: 'views/activity_list.html',
            controller: 'ActivityListCtrl'
        })
//        .when('/number', {
//            templateUrl: 'views/number.html',
//            controller: 'NumberCtrl'
//        })
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
var server = "http://192."

