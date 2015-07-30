describe('Unit: NewsFeedController', function NewsFeedControllerTests() {

  beforeEach(module('NewsFeed'));

  var ctrl, scope, mockNewsFeedDataService;

  var resultDefault = { success: true, data: [1,2,3]};
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

  it('should create $scope.greeting when calling sayHello', 
    function() {
      result = { success: true, data: [1,2,3,4,5] };
      scope.newsFeed.getNewsFeedItems();
      expect(scope.newsFeed.test.length).toEqual(5);
      result = resultDefault;
  });
});