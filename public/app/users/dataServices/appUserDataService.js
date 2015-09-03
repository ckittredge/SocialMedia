(function(){
    angular.module('AppUsers').service('appUserDataService', 
      ['$http', 
       function AppUserDataService($http){

          this.getCurrentUser = function(){
            var req = {
                 method: 'GET',
                 url: 'api/users/current',
            }
            var success = function success(response){
                return {
                    success: true,
                    data: response.data
                };
            }
            var error = function error(response){
                return {
                    success: false,
                    data: response.data
                }
            }
            return $http(req).then(success, error);
          };

          this.getFriendsList = function(user_id){
            var req = {
                 method: 'GET',
                 url: 'api/users/friends/' + user_id,
            }
            var success = function success(response){
                return {
                    success: true,
                    data: response.data
                };
            }
            var error = function error(response){
                return {
                    success: false,
                    data: response.data
                }
            }
            return $http(req).then(success, error);
          };

    }]);
}());