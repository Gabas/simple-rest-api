module.exports = function(app) {
   
  app.factory('Resource', ['$http', function($http) {
    
    var Resource = {};
    
    Resource.getAll = function(callback) {
      $http.get('/api/person')
        .then(callback(res), function(res) {
          console.log(res);
        });
    };

    return Resource;
  }]);
};