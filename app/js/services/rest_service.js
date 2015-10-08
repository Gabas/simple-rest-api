module.exports = function(app) {
  app.factory('Resource', ['$http', function($http) {
    
    var Resource = {};
    
    Resource.getAll = function(callback) {
      $http.get('/api/person')
        .then(handleSuccess(callback),
         handleError(callback));
    };

    Resource.create = function(data, callback) {
      $http.post('/api/person', data)
        .then(handleSuccess(callback),
         handleError(callback));
    };

    Resource.delete = function(data, callback) {
      $http.delete('/api/person/' + data._id)
        .then(handleSuccess(callback),
          handleError(callback));
    };

    Resource.update = function(data, callback) {
      $http.put('/api/person/' + data._id, data)
      .then(handleSuccess(callback),
          handleError(callback));
    };
    
    function handleSuccess(callback) {
      return function(res) {
        callback(null, res);
      };
    }

    function handleError(callback) {
      return function(res) {
        callback(res);
      };
    }
    
    return Resource;
  }]);
};