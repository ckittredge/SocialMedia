describe('Unit: NewsFeedController', function NewsFeedControllerTests() {

  beforeEach(module('NewsFeed'));

  var ctrl, scope, mockNewsFeedDataService;

  var resultDefault = { success: true, data: { data: [1,2,3] }};
  var result = resultDefault;
    
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    mockNewsFeedDataService = {
        getNewsFeedItems: function(){
            return {
                then: function(callback){
                    callback(result);
                }
            }
        }
    }
      
    ctrl = $controller('NewsFeedController', {
      $scope: scope,
      newsFeedDataService: mockNewsFeedDataService
    });
  }));

  it('should append to items array with subsequent getNewsFeedItems is called', 
    function() {
      result = { success: true, data: { data: [4,5,6,7,8] } };
      expect(scope.newsFeed.items.length).toEqual(3);
      scope.newsFeed.getNewsFeedItems();
      expect(scope.newsFeed.items.length).toEqual(8);
      result = resultDefault;
  });
    
});