angular.module('NewsFeed').controller('NewsFeedController', 
    ['$scope', 'newsFeedDataService', 'NEWS_FEED_TYPES',
    function newsFeedController($scope, newsFeedDataService, NEWS_FEED_TYPES){
        console.log('In the news feed controller');
        
        /*---------- Scope Setup ----------*/
        
        $scope.newsFeed = {
            items: []
        }
        
        /*---------- END Scope Setup ----------*/
        
        
        /*---------- Data Service Calls ----------*/

        $scope.newsFeed.getNewsFeedItems = function(){
            newsFeedDataService.getNewsFeedItems().then(function(result){
                if(result.success){
                    $scope.newsFeed.items.push.apply($scope.newsFeed.items, result.data.data);
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