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