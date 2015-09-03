(function(){
    angular.module('NewsFeed').directive('userStatusWidget', 
    [function UserStatusWidget(){
        return {
          restrict: 'E',
          replace: 'true',
          templateUrl: 'app/widgets/directives/partials/userStatusWidget.tpl.html',
          controller: 'UserStatusWidgetController'
      };
    }]);
}());