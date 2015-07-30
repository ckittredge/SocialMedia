angular.module('AppUsers').controller('FriendsListController', 
  ['$scope', '$window', 'AppUserDataService',
   function friendsListController($scope,$window, AppUserDataService){
       console.log("In friend's list controller");
       
       $scope.friendsList = {};
       
       $scope.friendsList.populateFriends = function(){
            AppUserDataService.getFriendsList($window.currentUser._id).then(function(result){
                $scope.friendsList.items = result.data.data;
            });
       }
       
       function init(){
           $scope.friendsList.populateFriends();
       }
       
       if($window.currentUser) init();
       
       $scope.$on('currentUserSet', function userSet(scope, currentUser){
           if(currentUser != null){
               $window.currentUser = currentUser;
               init();
           } else{
                throw 'Current user null';
           }
       });
   }
  ]);