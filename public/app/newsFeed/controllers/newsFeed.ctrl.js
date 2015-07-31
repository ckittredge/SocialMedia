angular.module('NewsFeed').controller('NewsFeedController', 
    ['$scope', 'newsFeedDataService', 'NEWS_FEED_TYPES',
    function newsFeedController($scope, newsFeedDataService, NEWS_FEED_TYPES){
        
        /*---------- Scope Setup ----------*/
        
        $scope.newsFeed = {
            items: []
        }
        
        /*---------- END Scope Setup ----------*/
        
        
        /*---------- Data Service Calls ----------*/

        $scope.newsFeed.getNewsFeedItems = function(){
            newsFeedDataService.getNewsFeedItems().then(function(result){
                if(result.success && result != null && result.data != null){
                    $scope.newsFeed.items.push.apply($scope.newsFeed.items, result.data.data);
                } else {
                    throw 'Returned null items'
                }
            });
        };
        
        /*---------- END Data Service Calls ----------*/
        
        
        /*---------- Init ----------*/
        
        function init(){
            $scope.newsFeed.getNewsFeedItems();
        };
        
        init();
        
        /*---------- END Init ----------*/
        
        
        /*---------- Event Listeners ----------*/
        
        $scope.$on('newStatusUpdatePosted', function statusUpdatePostedEvent(){
            $scope.newsFeed.getNewsFeedItems();
        });
        
        /*---------- END Event Listeners ----------*/
}]);