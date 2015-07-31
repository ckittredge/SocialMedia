var app = angular.module('SocialMediaApp', 
     ['ui.router', 'underscore', 'NewsFeed', 'SideMenu', 'Widgets', 'AppUsers']);

app.config(function SocialMediaAppConfig($stateProvider, $urlRouterProvider) {
  
  /*---------- Routing Config ----------*/
    
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
    
    /*---------- END Routing Config ----------*/
    
});

app.controller('MainController', ['$scope', '$window', '$state', 'appUserDataService', 
    function MainController($scope, $window, $state, appUserDataService){
        
        /*---------- Scope Setup ----------*/
        
        $scope.main = {};
        
        /*---------- END Scope Setup ----------*/
        
        
        /*---------- Data Service Calls ----------*/
        
        appUserDataService.getCurrentUser().then(function getCurrentUser(result){
            if(result.success && result != null && result.data != null 
               && result.data.data !=null){
                $scope.main.currentUser = $window.currentUser = result.data.data;
                $scope.$broadcast('currentUserSet', result.data.data);
            } else{
                throw 'Current user is null'
            }
        });
        
        /*---------- END Data Service Calls ----------*/
        
        
        /*---------- Init ----------*/
        
        function init(){
            $state.go('NewsFeed');
        };
        
        init();
        
        /*---------- END Init ----------*/
}]);