(function(){
    var underscore = angular.module('underscore', []);
    underscore.factory('_', ['$window', function UnderscoreFactory($window) {
      return $window._;
    }]);
}());
(function(){
    angular.module('NewsFeed', ['underscore']);
}());
(function(){
    angular.module('SideMenu', ['underscore']);
}());
(function(){
    angular.module('Widgets', ['underscore', 'NewsFeed']);
}());
(function(){
    angular.module('AppUsers', []);
}());
(function(){
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
}());
(function(){
    angular.module('NewsFeed').controller('NewsFeedController', 
        ['$scope', 'newsFeedDataService', 'NEWS_FEED_TYPES',
        function NewsFeedController($scope, newsFeedDataService, NEWS_FEED_TYPES){

            /*---------- Scope Setup ----------*/

            $scope.newsFeed = {
                items: []
            };

            /*---------- END Scope Setup ----------*/


            /*---------- Data Service Calls ----------*/

            $scope.newsFeed.getNewsFeedItems = function(){
                newsFeedDataService.getNewsFeedItems().then(function(result){
                    if(result.success && result != null && result.data != null){
                        _.each(result.data.data, function checkForDuplicates(item){
                            var existing = _.findWhere($scope.newsFeed.items, { _id: item._id });
                            if(existing == null) $scope.newsFeed.items.push(item);
                        });
                    } else {
                        throw 'Returned null items'
                    }
                });
            };

            /*---------- END Data Service Calls ----------*/


            /*---------- Init ----------*/

            function init(){
                $scope.newsFeed.getNewsFeedItems();
            }

            init();

            /*---------- END Init ----------*/


            /*---------- Event Listeners ----------*/

            $scope.$on('newStatusUpdatePosted', function statusUpdatePostedEvent(){
                $scope.newsFeed.getNewsFeedItems();
            });

            /*---------- END Event Listeners ----------*/
    }]);
}());
(function(){
    angular.module('NewsFeed').service('newsFeedDataService', 
    ['$http', 
     function NewsFeedDataService($http){ 
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
        };

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
        };
    }]);
}());
(function(){
    angular.module('NewsFeed').controller('NewsFeedItemController',
      ['$scope', 'NEWS_FEED_TYPES',
       function NewsFeedItemController($scope, NEWS_FEED_TYPES){

           /*---------- Scope Setup ----------*/

           $scope.newsFeedItem = {
               types: NEWS_FEED_TYPES
           };
           
           /*---------- END Scope Setup ----------*/

       }]);
}());
(function(){
    angular.module('NewsFeed').directive('newsFeedItem', 
    [function NewsFeedItem() {
      return {
          restrict: 'E',
          replace: 'true',
          scope: {
                details: '=ngModel'
          },
          templateUrl: 'app/newsFeed/directives/partials/newsFeedItem.tpl.html',
          controller: 'NewsFeedItemController',
          link: function newsFeedItemLink(scope, ele, attr){

              scope.$watch('details', function detailsWatch(newVal, oldVal){
                  scope.newsFeedItem.details = newVal;
              });
          }
      };
    }]);
}());
(function(){
    angular.module('NewsFeed').constant('NEWS_FEED_TYPES', {
        TEXT: 0,
        IMAGE: 1,
        VIDEO: 2
    });
}());
(function(){
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
}());
(function(){
    angular.module('Widgets').controller('UserStatusWidgetController',
     ['$scope', '$window', 'newsFeedDataService', 'NEWS_FEED_TYPES',
      function UserStatusWidgetController($scope, $window, newsFeedDataService, NEWS_FEED_TYPES){

          /*---------- Scope Setup ----------*/

          $scope.userStatusWidget = {
              containsImageLink: false,
              contentUrl: null,
              newsFeedTypes: NEWS_FEED_TYPES,
              statusText: '',
              statusType: NEWS_FEED_TYPES.TEXT
          };

          /*---------- END Scope Setup ----------*/
          
          
          /*---------- Helper Functions ----------*/
          
          $scope.userStatusWidget.checkStatusType = function checkStatusType(){
              if($scope.userStatusWidget.statusText == null || $scope.userStatusWidget.statusText.length === 0) return;
              var statusTextSplit = $scope.userStatusWidget.statusText.split(/\s/);
              var contentUrl = _.find(statusTextSplit, function(x){
                  return /(jpg|gif|png)/.test(x.trim());
              });
              if (contentUrl != null){
                  $scope.userStatusWidget.statusType = NEWS_FEED_TYPES.IMAGE; 
                  var sanitizedContentUrl = contentUrl.split(/(jpg|gif|png)/);
                  $scope.userStatusWidget.contentUrl = sanitizedContentUrl[0] + sanitizedContentUrl[1];
              } else{
                  $scope.userStatusWidget.statusType = NEWS_FEED_TYPES.TEXT;
                  $scope.userStatusWidget.contentUrl = null;
              }
          };
          
          /*---------- END Helper Functions ----------*/


          /*---------- Button Actions ----------*/

          $scope.userStatusWidget.clear = function clearStatus(){
              $scope.userStatusWidget.statusText = '';
              $scope.userStatusWidget.contentUrl = null;
              $scope.userStatusWidget.statusType = NEWS_FEED_TYPES.TEXT;
          };

          $scope.userStatusWidget.submit = function submitStatus(){
              var statusText = $scope.userStatusWidget.contentUrl != null ? 
                  $scope.userStatusWidget.statusText.replace($scope.userStatusWidget.contentUrl, "") : 
                  $scope.userStatusWidget.statusText;
              var status = {
                    type: $scope.userStatusWidget.statusType,
                    user: $window.currentUser,
                    text: statusText,
                    contentUrl: $scope.userStatusWidget.contentUrl,
                    createDT: new Date()
              };
              newsFeedDataService.postStatusUpdate(status).then(function(response){
                  if(response.success){
                    $scope.userStatusWidget.clear();
                    $scope.$broadcast('newStatusUpdatePosted');
                  } else{
                      throw 'Error posting status'
                  }
              });
          };

          /*---------- END Button Actions ----------*/

      }]);
}());
(function(){
    angular.module('NewsFeed').directive('userStatusWidget', 
    [function UserStatusWidget(){
        return {
          restrict: 'E',
          replace: 'true',
          templateUrl: 'app/widgets/directives/partials/userStatusWidget.tpl.html',
          controller: 'UserStatusWidgetController'
      };
    }]);
}());
(function(){
    angular.module('AppUsers').controller('FriendsListController', 
      ['$scope', '$window', 'appUserDataService',
       function FriendsListController($scope, $window, appUserDataService){

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
}());
(function(){
    angular.module('AppUsers').service('appUserDataService', 
      ['$http', 
       function AppUserDataService($http){

          this.getCurrentUser = function(){
            var req = {
                 method: 'GET',
                 url: 'api/users/current',
            };
            var success = function success(response){
                return {
                    success: true,
                    data: response.data
                };
            };
            var error = function error(response){
                return {
                    success: false,
                    data: response.data
                }
            };
            return $http(req).then(success, error);
          };

          this.getFriendsList = function(user_id){
            var req = {
                 method: 'GET',
                 url: 'api/users/friends/' + user_id,
            };
            var success = function success(response){
                return {
                    success: true,
                    data: response.data
                };
            };
            var error = function error(response){
                return {
                    success: false,
                    data: response.data
                }
            };
            return $http(req).then(success, error);
          };

    }]);
}());
(function(){
    angular.module('AppUsers').controller('UserInfoCardController', 
      ['$scope', 
       function UserInfoCardController($scope){

           /*---------- Scope Setup ----------*/

           $scope.userInfoCard = {};

           /*---------- END Scope Setup ----------*/
       }
    ]);
}());
(function(){
    angular.module('AppUsers').directive('userInfoCard', [function UserInfoCard(){
        return {
          restrict: 'E',
          replace: 'true',
          scope: {
                details: '=ngModel'
          },
          templateUrl: 'app/users/directives/partials/userInfoCard.tpl.html',
          controller: 'UserInfoCardController',
          link: function newsFeedItemLink(scope, ele, attr){
              
              scope.$watch('details', function detailsWatch(newVal, oldVal){
                  scope.userInfoCard.details = newVal;
              });
          }
        }
    }]);
}());