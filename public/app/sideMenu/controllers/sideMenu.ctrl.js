angular.module('SideMenu').controller('SideMenuController',
  ['$scope',
   function SideMenuController($scope){
        console.log('In the side menu controller');
        $scope.sideMenu = {
            items: [
                {
                    name: 'Profile',
                    sref: 'Profile',
                    selected: false
                },
                {
                    name: 'News Feed',
                    sref: 'NewsFeed',
                    selected: false
                }
            ]
        };
       
   }]);