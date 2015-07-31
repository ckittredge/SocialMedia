var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function UnderscoreFactory($window) {
  return $window._;
}]);
angular.module('NewsFeed', ['underscore']);
angular.module('SideMenu', ['underscore']);
angular.module('Widgets', ['underscore', 'NewsFeed']);
angular.module('AppUsers', []);
var app = angular.module('SocialMediaApp', 
     ['ui.router', 'underscore', 'NewsFeed', 'SideMenu', 'Widgets', 'AppUsers']);

app.config(['$stateProvider', '$urlRouterProvider', function SocialMediaAppConfig($stateProvider, $urlRouterProvider) {
  
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
    
}]);

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
angular.module('NewsFeed').controller('NewsFeedController', 
    ['$scope', 'newsFeedDataService', 'NEWS_FEED_TYPES',
    function newsFeedController($scope, newsFeedDataService, NEWS_FEED_TYPES){
        
        /*---------- Scope Setup ----------*/
        
        $scope.newsFeed = {
            items: []
        }
        
        /*---------- END Scope Setup ----------*/
        
        
        /*---------- Data Service Calls ----------*/

        $scope.newsFeed.getNewsFeedItems = function(){
            newsFeedDataService.getNewsFeedItems().then(function(result){
                if(result.success && result != null && result.data != null){
                    $scope.newsFeed.items.push.apply($scope.newsFeed.items, result.data.data);
                } else {
                    throw 'Returned null items'
                }
            });
        };
        
        /*---------- END Data Service Calls ----------*/
        
        
        /*---------- Init ----------*/
        
        function init(){
            $scope.newsFeed.getNewsFeedItems();
        };
        
        init();
        
        /*---------- END Init ----------*/
        
        
        /*---------- Event Listeners ----------*/
        
        $scope.$on('newStatusUpdatePosted', function statusUpdatePostedEvent(){
            $scope.newsFeed.getNewsFeedItems();
        });
        
        /*---------- END Event Listeners ----------*/
}]);
angular.module('NewsFeed').service('newsFeedDataService', ['$http', function($http){
    this.getNewsFeedItems = function getNewsFeedItems(userId){
        var req = {
             method: 'GET',
             url: 'api/newsfeed/items/' + userId,
        }
        var success = function success(response){
            return {
                success: true,
                data: response.data
            };
        }
        var error = function error(response){
            return {
                success: false,
                data: response.data
            }
        }
        return $http(req).then(success, error);
    }
    
    this.postStatusUpdate = function postStatusUpdate(status){
        var req = {
             method: 'POST',
             url: 'api/newsfeed/item',
             data: status
        }
        var success = function success(response){
            return {
                success: true,
                data: response.data
            };
        }
        var error = function error(response){
            return {
                success: false,
                data: response.data
            }
        }
        return $http(req).then(success, error);
    }
    
}]);
angular.module('NewsFeed').controller('NewsFeedItemController',
  ['$scope',
   function NewsFeedItemController($scope){
       
       /*---------- Scope Setup ----------*/
       
       $scope.newsFeedItem = $scope.newsFeedItem || {};
       
       /*---------- END Scope Setup ----------*/
       
   }]);
angular.module('NewsFeed').directive('newsFeedItem', [function newsFeedItem() {
  return {
      restrict: 'E',
      replace: 'true',
      scope: {
            details: '=ngModel'
      },
      templateUrl: 'app/newsFeed/directives/partials/newsFeedItem.tpl.html',
      controller: 'NewsFeedItemController',
      link: function newsFeedItemLink(scope, ele, attr){
          scope.newsFeedItem = scope.newsFeedItem || {};
          
          scope.$watch('details', function detailsWatch(newVal, oldVal){
              scope.newsFeedItem.details = newVal;
          });
      }
  };
}]);
angular.module('NewsFeed').constant('NEWS_FEED_TYPES', {
    TEXT: 0,
    IMAGE: 1,
    VIDEO: 2
});
angular.module('SideMenu').controller('SideMenuController',
  ['$scope',
   function SideMenuController($scope){
        
        /*---------- Scope Setup ----------*/
       
        $scope.sideMenu = {
            items: [
                {
                    name: 'News Feed',
                    sref: 'NewsFeed',
                    selected: false
                },
                {
                    name: 'Friends List',
                    sref: 'FriendsList',
                    selected: false
                }
            ]
        };
       
       /*---------- END Scope Setup ----------*/
       
       
       /*---------- Event Listeners ----------*/
       
       $scope.$on('$stateChangeSuccess', function StateChangeStart(scope, state){
          _.each($scope.sideMenu.items, function SideMenuCallback(item){
                item.selected = item.sref === state.name;
          });
       });
       
       /*---------- END Event Listeners ----------*/
       
   }]);
angular.module('Widgets').controller('UserStatusWidgetController',
 ['$scope', '$window', 'newsFeedDataService', 'NEWS_FEED_TYPES',
  function UserStatusWidgetController($scope, $window, newsFeedDataService, NEWS_FEED_TYPES){
      
      /*---------- Scope Setup ----------*/
      
      $scope.userStatusWidget = {
            statusText: ''
      };

      /*---------- END Scope Setup ----------*/
      
      
      /*---------- Form Setup ----------*/
      
      $scope.userStatusWidget.setForm = function(form){
            $scope.userStatusWidget.form = form;
      }
      
      /*---------- END Form Setup ----------*/
      
      
      /*---------- Button Actions ----------*/
      
      $scope.userStatusWidget.clear = function clearStatus(){
            $scope.userStatusWidget.statusText = '';
      }
      
      $scope.userStatusWidget.submit = function submitStatus(){
          var status = {
                type: NEWS_FEED_TYPES.TEXT,
                user: $window.currentUser,
                text: $scope.userStatusWidget.statusText,
                createDT: new Date()
          }
          newsFeedDataService.postStatusUpdate(status).then(function(response){
              if(response.success){
                $scope.userStatusWidget.clear();
                $scope.$broadcast('newStatusUpdatePosted');
              } else{
                  throw 'Error posting status'
              }
          });
      }
      
      /*---------- END Button Actions ----------*/
  
  }]);
angular.module('NewsFeed').directive('userStatusWidget', [function(){
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'app/widgets/directives/partials/userStatusWidget.tpl.html',
      controller: 'UserStatusWidgetController'
  };
}]);
angular.module('AppUsers').controller('FriendsListController', 
  ['$scope', '$window', 'appUserDataService',
   function friendsListController($scope, $window, appUserDataService){
       
       /*---------- Scope Setup ----------*/
       
       $scope.friendsList = {};
       
       /*---------- Scope Setup ----------*/
       
       
       /*---------- Data Service Calls ----------*/
       
       $scope.friendsList.populateFriends = function(){
           if($window.currentUser != null & $window.currentUser._id != null){
                appUserDataService.getFriendsList($window.currentUser._id).then(function(result){
                    if(result.success && result != null 
                       && result.data != null && result.data.data != null){
                        $scope.friendsList.items = result.data.data;
                    } else{
                        throw 'Error retrieving friends list'
                    }
                });
           } else{
               throw 'Current user is null'
           }
       };
       
       /*---------- END Data Service Calls ----------*/
       
       
       /*---------- Init ----------*/
       
       function init(){
           $scope.friendsList.populateFriends();
       }
       
       if($window.currentUser) init();
       
       /*---------- Init ----------*/
       
       
       /*---------- Event Listeners ----------*/
       
       $scope.$on('currentUserSet', function userSet(scope, currentUser){
           if(currentUser != null){
               $window.currentUser = currentUser;
               init();
           } else{
                throw 'Current user null';
           }
       });
       
       /*---------- END Event Listeners ----------*/
   }
  ]);
angular.module('AppUsers').service('appUserDataService', 
  ['$http', function($http){
      
      this.getCurrentUser = function(){
        var req = {
             method: 'GET',
             url: 'api/users/current',
        }
        var success = function success(response){
            return {
                success: true,
                data: response.data
            };
        }
        var error = function error(response){
            return {
                success: false,
                data: response.data
            }
        }
        return $http(req).then(success, error);
      }
      
      this.getFriendsList = function(user_id){
        var req = {
             method: 'GET',
             url: 'api/users/friends/' + user_id,
        }
        var success = function success(response){
            return {
                success: true,
                data: response.data
            };
        }
        var error = function error(response){
            return {
                success: false,
                data: response.data
            }
        }
        return $http(req).then(success, error);
      }
      
}]);
angular.module('AppUsers').controller('UserInfoCardController', 
  ['$scope', 
   function userInfoCardController($scope){
       
       /*---------- Scope Setup ----------*/
       
       $scope.userInfoCard = $scope.userInfoCard || {};
       
       /*---------- END Scope Setup ----------*/
       
   }
]);
angular.module('AppUsers').directive('userInfoCard', [function userInfoCard(){
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
            details: '=ngModel'
      },
      templateUrl: 'app/users/directives/partials/userInfoCard.tpl.html',
      controller: 'UserInfoCardController',
      link: function newsFeedItemLink(scope, ele, attr){
          scope.userInfoCard = scope.userInfoCard || {};
          
          scope.$watch('details', function detailsWatch(newVal, oldVal){
              scope.userInfoCard.details = newVal;
          });
      }
    }
}]);