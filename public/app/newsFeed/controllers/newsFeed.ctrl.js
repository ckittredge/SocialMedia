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
                    $scope.newsFeed.test = result.data;
                }
            });
            $scope.newsFeed.items = [
                {
                    type: NEWS_FEED_TYPES.TEXT,
                    user: {
                        firstName: 'Chris',
                        lastName: 'Kittredge',
                        imageUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/0ad/39d/0944912.jpg'
                    },
                    text: 'I just ate some great Sushi!',
                    createDT: new Date('07/28/2014')
                },
                {
                    type: NEWS_FEED_TYPES.IMAGE,
                    user: {
                        firstName: 'Chris',
                        lastName: 'Rock',
                        imageUrl: 'http://d1oi7t5trwfj5d.cloudfront.net/b8/fb/e79307884bf98515e3317b78e1f1/chris-rock.jpg'
                    },
                    text: 'I hate when people post about food!',
                    createDT: new Date('07/29/2014')
                },
                {
                    type: NEWS_FEED_TYPES.TEXT,
                    user: {
                        firstName: 'Chris',
                        lastName: 'Kittredge',
                        imageUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/0ad/39d/0944912.jpg'
                    },
                    text: 'I just ate some great Sushi!',
                    createDT: new Date('07/28/2014')
                },
                {
                    type: NEWS_FEED_TYPES.IMAGE,
                    user: {
                        firstName: 'Chris',
                        lastName: 'Rock',
                        imageUrl: 'http://d1oi7t5trwfj5d.cloudfront.net/b8/fb/e79307884bf98515e3317b78e1f1/chris-rock.jpg'
                    },
                    text: 'I hate when people post about food!',
                    createDT: new Date('07/29/2014')
                },
                {
                    type: NEWS_FEED_TYPES.TEXT,
                    user: {
                        firstName: 'Chris',
                        lastName: 'Kittredge',
                        imageUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/0ad/39d/0944912.jpg'
                    },
                    text: 'I just ate some great Sushi!',
                    createDT: new Date('07/28/2014')
                },
                {
                    type: NEWS_FEED_TYPES.IMAGE,
                    user: {
                        firstName: 'Chris',
                        lastName: 'Rock',
                        imageUrl: 'http://d1oi7t5trwfj5d.cloudfront.net/b8/fb/e79307884bf98515e3317b78e1f1/chris-rock.jpg'
                    },
                    text: 'I hate when people post about food!',
                    createDT: new Date('07/29/2014')
                },
                {
                    type: NEWS_FEED_TYPES.TEXT,
                    user: {
                        firstName: 'Chris',
                        lastName: 'Kittredge',
                        imageUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/0ad/39d/0944912.jpg'
                    },
                    text: 'I just ate some great Sushi!',
                    createDT: new Date('07/28/2014')
                },
                {
                    type: NEWS_FEED_TYPES.IMAGE,
                    user: {
                        firstName: 'Chris',
                        lastName: 'Rock',
                        imageUrl: 'http://d1oi7t5trwfj5d.cloudfront.net/b8/fb/e79307884bf98515e3317b78e1f1/chris-rock.jpg'
                    },
                    text: 'I hate when people post about food!',
                    createDT: new Date('07/29/2014')
                },
                {
                    type: NEWS_FEED_TYPES.TEXT,
                    user: {
                        firstName: 'Chris',
                        lastName: 'Kittredge',
                        imageUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/0ad/39d/0944912.jpg'
                    },
                    text: 'I just ate some great Sushi!',
                    createDT: new Date('07/28/2014')
                },
                {
                    type: NEWS_FEED_TYPES.IMAGE,
                    user: {
                        firstName: 'Chris',
                        lastName: 'Rock',
                        imageUrl: 'http://d1oi7t5trwfj5d.cloudfront.net/b8/fb/e79307884bf98515e3317b78e1f1/chris-rock.jpg'
                    },
                    text: 'I hate when people post about food!',
                    createDT: new Date('07/29/2014')
                }
            ];
        };
        
        function init(){
            $scope.newsFeed.getNewsFeedItems();
        };
        
        init();
}]);