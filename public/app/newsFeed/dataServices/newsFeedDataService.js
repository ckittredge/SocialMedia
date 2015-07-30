angular.module('NewsFeed').service('newsFeedDataService', function(){
    this.getNewsFeedItems = function getNewsFeedItems(){
        return {
            then: function(callback){
                callback([]);
            }
        }
    }
})