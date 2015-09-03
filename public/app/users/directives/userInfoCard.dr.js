(function(){
    angular.module('AppUsers').directive('userInfoCard', [function UserInfoCard(){
        return {
          restrict: 'E',
          replace: 'true',
          scope: {
                details: '=ngModel'
          },
          templateUrl: 'app/users/directives/partials/userInfoCard.tpl.html',
          controller: 'UserInfoCardController',
          link: function newsFeedItemLink(scope, ele, attr){
              
              scope.$watch('details', function detailsWatch(newVal, oldVal){
                  scope.userInfoCard.details = newVal;
              });
          }
        }
    }]);
}());