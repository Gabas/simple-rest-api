require('angular/angular');

var phoneBook = angular.module('phoneBookApp', []);

phoneBook.controller('mainController', ['$scope', function($scope) {
  $scope.about = 'This simple app can serve you as simple phone book. You can simply add, delete and update your instances';
}]);