angular.module('NewsFeed').directive('newsFeedItem', [function newsFeedItem() {
  return {
      restrict: 'E',
      replace: 'true',
      scope: {
            details: '=ngModel'
      },
      templateUrl: 'app/newsFeed/directives/partials/newsFeedItem.tpl.html',
      controller: 'NewsFeedItemController',
      link: function newsFeedItemLink(scope, ele, attr){
          scope.newsFeedItem = scope.newsFeedItem || {};
          
          scope.$watch('details', function detailsWatch(newVal, oldVal){
              scope.newsFeedItem.details = newVal;
          });
      }
  };
}]);