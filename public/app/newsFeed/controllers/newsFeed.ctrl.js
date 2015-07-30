angular.module('NewsFeed').controller('NewsFeedController', 
    ['$scope', 'newsFeedDataService', 'NEWS_FEED_TYPES',
    function newsFeedController($scope, newsFeedDataService, NEWS_FEED_TYPES){
        console.log('In the news feed controller');
        
        $scope.newsFeed = {
            items: []
        }

        $scope.newsFeed.getNewsFeedItems = function(){
            newsFeedDataService.getNewsFeedItems().then(function(result){
                if(result.success){
                    $scope.newsFeed.items.push.apply($scope.newsFeed.items, result.response.data.data);
                }
            });
        };
        
        function init(){
            $scope.newsFeed.getNewsFeedItems();
        };
        
        init();
}]);