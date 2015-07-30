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
                    _.each(result.response.data.data, function appendNewItems(item){
                        var existing = _.findWhere($scope.newsFeed.items, { id: item.id });
                        if(existing == null){
                            $scope.newsFeed.items.push(item);
                        }
                    });
                }
            });
        };
        
        function init(){
            $scope.newsFeed.getNewsFeedItems();
        };
        
        init();
}]);