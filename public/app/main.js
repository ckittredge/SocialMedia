var app = angular.module('SocialMediaApp', 
     ['ui.router', 'underscore', 'NewsFeed', 'SideMenu', 'Widgets', 'AppUsers']);

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
            templateUrl: "app/users/partials/friendsList.tpl.html",
            controller: "FriendsListController"     
        }
      }
    });
});

app.controller('MainController', ['$scope', '$window', '$state', 'AppUserDataService', 
    function MainController($scope, $window, $state, AppUserDataService){
    console.log('in the main controller');
        
        $scope.main = {};
        
        AppUserDataService.getCurrentUser().then(function getCurrentUser(result){
            $scope.main.currentUser = $window.currentUser = result.data.data;
            $scope.$broadcast('currentUserSet', result.data.data);
        })
        
        function init(){
            $state.go('NewsFeed');
        }
        
        init();
}]);