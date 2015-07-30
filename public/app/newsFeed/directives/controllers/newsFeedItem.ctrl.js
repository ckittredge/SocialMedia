angular.module('NewsFeed').controller('NewsFeedItemController',
  ['$scope',
   function NewsFeedItemController($scope){
       console.log('In the news feed item controller');
    
       $scope.newsFeedItem = $scope.newsFeedItem || {};
   }]);