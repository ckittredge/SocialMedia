angular.module('AppUsers').controller('UserInfoCardController', 
  ['$scope', 
   function userInfoCardController($scope){
       console.log('In user info card controller');
       $scope.userInfoCard = $scope.userInfoCard || {};
   }
]);