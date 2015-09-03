(function(){
    angular.module('Widgets').controller('UserStatusWidgetController',
     ['$scope', '$window', 'newsFeedDataService', 'NEWS_FEED_TYPES',
      function UserStatusWidgetController($scope, $window, newsFeedDataService, NEWS_FEED_TYPES){

          /*---------- Scope Setup ----------*/

          $scope.userStatusWidget = {
                statusText: '',
                containsImageLink: false
          };

          /*---------- END Scope Setup ----------*/
          
          
          /*---------- Helper Functions ----------*/
          
          $scope.userStatusWidget.checkStatusType = function checkStatusType(){
//              if (/(jpg|gif|png)$/.test($scope.userStatusWidget.statusText)){
//                $scope.userStatusWidget.containsImageLink = true;
//              } else{
//                $scope.userStatusWidget.containsImageLink = false;
//              }
          };
          
          /*---------- END Helper Functions ----------*/


          /*---------- Button Actions ----------*/

          $scope.userStatusWidget.clear = function clearStatus(){
                $scope.userStatusWidget.statusText = '';
          };

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
          };

          /*---------- END Button Actions ----------*/

      }]);
}());