describe('Unit: UserStatusWidgetController', function NewsFeedControllerTests() {

  beforeEach(module('Widgets'));

  var ctrl, scope, mockWindow, mockNewsFeedDataService, MOCK_NEWS_FEED_TYPES;
    
  var postStatusResponse = { success: true };
    
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    mockNewsFeedDataService = {
        postStatusUpdate: function mockPostStatusUpdate(status){
            return {
                then: function(callback){
                    callback(postStatusResponse);
                }
            }
        }
    };
    spyOn(mockNewsFeedDataService, 'postStatusUpdate').and.callThrough();
    MOCK_NEWS_FEED_TYPES = {};
    mockWindow = {};
    ctrl = $controller('UserStatusWidgetController', {
        $scope: scope,
        $window: mockWindow,
        newsFeedDataService: mockNewsFeedDataService,
        NEWS_FEED_TYPES: MOCK_NEWS_FEED_TYPES
    });
  }));

  it('should clear statusText when clear is called', 
    function clearStatusTest() {
      scope.userStatusWidget.statusText = 'Test';
      scope.userStatusWidget.clear();
      expect(scope.userStatusWidget.statusText).toEqual('');
  });
    
  it('should call postStatusUpdate when submit is called', 
    function postStatusUpdateTest() {
      scope.userStatusWidget.submit();
      expect(mockNewsFeedDataService.postStatusUpdate).toHaveBeenCalled();
  });

});