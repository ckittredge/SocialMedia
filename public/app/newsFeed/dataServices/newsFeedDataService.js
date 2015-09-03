(function(){
    angular.module('NewsFeed').service('newsFeedDataService', 
    ['$http', 
     function NewsFeedDataService($http){ 
        this.getNewsFeedItems = function getNewsFeedItems(userId){
            var req = {
                 method: 'GET',
                 url: 'api/newsfeed/items/' + userId,
            }
            var success = function success(response){
                return {
                    success: true,
                    data: response.data
                };
            }
            var error = function error(response){
                return {
                    success: false,
                    data: response.data
                }
            }
            return $http(req).then(success, error);
        };

        this.postStatusUpdate = function postStatusUpdate(status){
            var req = {
                 method: 'POST',
                 url: 'api/newsfeed/item',
                 data: status
            }
            var success = function success(response){
                return {
                    success: true,
                    data: response.data
                };
            }
            var error = function error(response){
                return {
                    success: false,
                    data: response.data
                }
            }
            return $http(req).then(success, error);
        };
    }]);
}());