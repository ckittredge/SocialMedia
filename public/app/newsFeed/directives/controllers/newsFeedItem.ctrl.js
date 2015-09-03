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