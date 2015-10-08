module.exports = function(phoneBook) {

  phoneBook.controller('mainController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
    
  $scope.book = [];


  $scope.getAll = function() {
    Resource.getAll(function(res) {
      $scope.book = res.data;
    });
  };

  $scope.create = function(record) {
    $scope.book.push(record);
    $scope.newRecord = {};
    Resource.create(record, function(err, res) {
      if (err) {
        $scope.book.pop();
        return console.log(err);
      }
      record._id = res.data._id;
    });
  };

  $scope.delete = function(record) {
    Resource.delete(record, function(err, res) {
      if (err) return console.log(err);
      $scope.book.splice($scope.book.indexOf(record), 1);
    });
  };

  $scope.update = function(record) {
    Resource.update(record, function(err, res) {
      if (err) return console.log(err);
      record.editing = false;
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