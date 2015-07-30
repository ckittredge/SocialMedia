describe('Unit: SideMenuController', function NewsFeedControllerTests() {

  beforeEach(module('SideMenu'));

  var ctrl, scope;
    
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
      
    ctrl = $controller('SideMenuController', {
      $scope: scope
    });
  }));

  it('should create $scope.greeting when calling sayHello', 
    function () {
      scope.sideMenu.items = [
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
            ];
      scope.$broadcast('$stateChangeSuccess', { name: 'NewsFeed' });
      expect(scope.sideMenu.items[0].selected).toEqual(true);
      expect(scope.sideMenu.items[1].selected).toEqual(false);
  });

});