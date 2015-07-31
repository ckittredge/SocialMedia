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