angular.module('AppUsers').service('AppUserDataService', 
  ['$http', function($http){
      
      this.getCurrentUser = function(){
        var req = {
             method: 'GET',
             url: 'api/users/current',
        }
        var success = function success(response){
            return {
                success: true,
                response: response
            };
        }
        var error = function error(response){
            return {
                success: false,
                response: response
            }
        }
        return $http(req, success, error);
      }
      
      this.getFriendsList = function(user_id){
        var req = {
             method: 'GET',
             url: 'api/users/friends/' + user_id,
        }
        var success = function success(response){
            return {
                success: true,
                response: response
            };
        }
        var error = function error(response){
            return {
                success: false,
                response: response
            }
        }
        return $http(req, success, error);
      }
      
}]);