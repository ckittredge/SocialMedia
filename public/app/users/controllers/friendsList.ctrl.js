angular.module('AppUsers').controller('FriendsListController', 
  ['$scope', '$window', 'appUserDataService',
   function friendsListController($scope,$window, appUserDataService){
       
       /*---------- Scope Setup ----------*/
       
       $scope.friendsList = {};
       
       /*---------- Scope Setup ----------*/
       
       
       /*---------- Data Service Calls ----------*/
       
       $scope.friendsList.populateFriends = function(){
            appUserDataService.getFriendsList($window.currentUser._id).then(function(result){
                $scope.friendsList.items = result.data.data;
            });
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