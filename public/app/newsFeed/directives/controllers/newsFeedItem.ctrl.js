angular.module('NewsFeed').controller('NewsFeedItemController',
  ['$scope',
   function NewsFeedItemController($scope){
       
       /*---------- Scope Setup ----------*/
       
       $scope.newsFeedItem = $scope.newsFeedItem || {};
       
       /*---------- END Scope Setup ----------*/
       
   }]);