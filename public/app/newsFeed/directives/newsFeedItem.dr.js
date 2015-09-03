(function(){
    angular.module('NewsFeed').directive('newsFeedItem', 
    [function NewsFeedItem() {
      return {
          restrict: 'E',
          replace: 'true',
          scope: {
                details: '=ngModel'
          },
          templateUrl: 'app/newsFeed/directives/partials/newsFeedItem.tpl.html',
          controller: 'NewsFeedItemController',
          link: function newsFeedItemLink(scope, ele, attr){

              scope.$watch('details', function detailsWatch(newVal, oldVal){
                  scope.newsFeedItem.details = newVal;
              });
          }
      };
    }]);
}());