angular.module('SideMenu').controller('SideMenuController',
  ['$scope',
   function SideMenuController($scope){
        console.log('In the side menu controller');
        $scope.sideMenu = {
            items: [
                {
                    name: 'News Feed',
                    sref: 'NewsFeed',
                    selected: false
                },
                {
                    name: 'Friends',
                    sref: 'FriendsList',
                    selected: false
                }
            ]
        };
       
       $scope.$on('$stateChangeSuccess', function StateChangeStart(scope, state){
          _.each($scope.sideMenu.items, function SideMenuCallback(item){
                item.selected = item.sref === state.name;
          });
       });
       
   }]);