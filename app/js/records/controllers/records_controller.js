module.exports = function(phoneBook) {

  phoneBook.controller('mainController', ['$scope', '$http', function($scope, $http) {

  $scope.getAll = function() {
    $http.get('/api/person')
    .then(function(res) {
      $scope.book = res.data;
    }, function(res) {

    });
  };

  $scope.create = function(record) {
    $http.post('/api/person', record)
      .then(function(res) {
        $scope.record = '';
        $scope.getAll();
      }, function(res) {

      });
  };

  $scope.delete = function(id) {
    $http.delete('api/person/' + id)
      .then(function(res) {
        $scope.getAll();
      }, function(res) {

      });
  };

  $scope.update = function(record) {
    $http.put('/api/person/' + record._id, record)
      .then(function(res) {
        $scope.getAll();
      }, function(res) {

      });
  };

  $scope.edit = function(record) {
    record.editing = true;
    record.oldName = record.name;
    record.oldPhone = record.phoneNumber;
  };

  $scope.cancel = function(record) {
    record.editing = false;
    record.name = record.oldName;
    record.phoneNumber = record.oldPhone;
  };

}]);
};