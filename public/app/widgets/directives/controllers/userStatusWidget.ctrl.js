angular.module('Widgets').controller('UserStatusWidgetController',
 ['$scope',
  function UserStatusWidgetController($scope){
    console.log('In the user status widget controller');
      
      $scope.userStatusWidget = {
            statusText: ''
      };
      
      $scope.userStatusWidget.clear = function clearStatus(){
            $scope.userStatusWidget.statusText = '';
      }
      
      $scope.userStatusWidget.submit = function submitStatus(){
            console.log('submit user status from user: ' + window.currentUser._id);
      }
  
  }]);