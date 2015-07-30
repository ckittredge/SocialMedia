var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function UnderscoreFactory() {
  return $window._;
}]);

var app = angular.module('SocialMediaApp', ['ui.router', 'underscore', 'NewsFeed', 'SideMenu', 'Widgets']);

app.config(function SocialMediaAppConfig($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/");
  
  $stateProvider
    .state('NewsFeed', {
      url: "/",
      views:{
        SideMenu: {
            templateUrl: "app/sideMenu/partials/sideMenu.tpl.html",
            controller: "SideMenuController"     
        },
        MainView: {
            templateUrl: "app/newsFeed/partials/newsFeed.tpl.html",
            controller: "NewsFeedController"     
        }
      }
    })
});

app.controller('MainController', ['$scope', 
    function MainController($scope){
    console.log('in the main controller');
}]);