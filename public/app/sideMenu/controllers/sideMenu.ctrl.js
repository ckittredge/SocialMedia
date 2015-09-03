(function(){
    angular.module('SideMenu').controller('SideMenuController',
      ['$scope',
       function SideMenuController($scope){

            /*---------- Scope Setup ----------*/

            $scope.sideMenu = {
                items: [
                    {
                        name: 'News Feed',
                        sref: 'NewsFeed',
                        selected: false
                    },
                    {
                        name: 'Friends List',
                        sref: 'FriendsList',
                        selected: false
                    }
                ]
            };

           /*---------- END Scope Setup ----------*/


           /*---------- Event Listeners ----------*/

           $scope.$on('$stateChangeSuccess', function StateChangeStart(scope, state){
              _.each($scope.sideMenu.items, function SideMenuCallback(item){
                    item.selected = item.sref === state.name;
              });
           });

           /*---------- END Event Listeners ----------*/

       }]);
}());