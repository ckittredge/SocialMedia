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
    .state('FriendsList', {
      url: "/Friends",
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
    });
});

app.controller('MainController', ['$scope', '$rootScope', '$state', 
    function MainController($scope, $rootScope, $state){
    console.log('in the main controller');
        
        function init(){
            $state.go('NewsFeed');
        }
        
        init();
}]);