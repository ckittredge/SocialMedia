angular.module('NewsFeed').service('newsFeedDataService', ['$http', function($http){
    this.getNewsFeedItems = function getNewsFeedItems(){
        var req = {
             method: 'GET',
             url: 'api/newsfeed/items/' + 1,
        }
        var success = function success(response){
            return {
                success: true,
                response: response
            };
        }
        var error = function error(response){
            return {
                success: false,
                response: response
            }
        }
        return $http(req).then(success, error);
    }
}]);