describe('Unit: FriendsListController', function NewsFeedControllerTests() {

  beforeEach(module('AppUsers'));

  var ctrl, scope, mockWindow, mockAppUserDataService;
    
  var friendsListResult = { success: true, data: {data: []}};
    
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    mockAppUserDataService = {
        getFriendsList: function mockGetFriendsList(userId){
            return {
                then: function(callback){
                    callback(friendsListResult);
                }
            }
        }
    };
    mockWindow = {};
    ctrl = $controller('FriendsListController', {
        $scope: scope,
        $window: mockWindow,
        appUserDataService: mockAppUserDataService
    });
  }));

  it('should populate friends list when populateFriends is called', 
    function () {
      scope.friendsList.items = [];
      mockWindow.currentUser = { _id: 1 };
      friendsListResult = { success: true, data: {data: [1,2,3]}};
      scope.friendsList.populateFriends();
      expect(scope.friendsList.items.length).toEqual(3);
  });
    
  it('should populate friends list when currentUserSet is broadcast', 
    function () {
      scope.friendsList.items = [];
      mockWindow.currentUser = { _id: 1 };
      friendsListResult = { success: true, data: {data: [1,2,3]}};
      scope.$broadcast('currentUserSet', mockWindow.currentUser);
      expect(scope.friendsList.items.length).toEqual(3);
  });

});