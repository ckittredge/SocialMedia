(function(){
    var underscore = angular.module('underscore', []);
    underscore.factory('_', ['$window', function UnderscoreFactory($window) {
      return $window._;
    }]);
}());