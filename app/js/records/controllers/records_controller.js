module.exports = function(phoneBook) {

  phoneBook.controller('mainController', 'Resource', ['$scope', '$http', function($scope, $http) {
    var resource = Resource;
    $scope.book = [];


  $scope.getAll = function() {
        resource.getAll(function(res) {
          $scope.book = res.data;
        });



    // $http.get('/api/person')
    // .then(function(res) {
    //   $scope.book = res.data;
    // }, function(res) {

    // });
  };

  $scope.create = function(record) {
    $http.post('/api/person', record)
      .then(function(res) {
        $scope.book.push(record);
        $scope.newRecord = {};
        console.log(res);
      }, function(res) {
        $scope.newRecord = {};
      });
  };

  $scope.delete = function(record) {
    $http.delete('/api/person/' + record._id)
      .then(function(res) {
        $scope.book.splice($scope.book.indexOf(record), 1);
      }, function(res) {

      });
  };

  $scope.update = function(record) {
    $http.put('/api/person/' + record._id, record)
      .then(function(res) {
        record.editing = false;
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