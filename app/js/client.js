require('angular/angular');
// require('./css/style.css');

var phoneBook = angular.module('phoneBookApp', []);

require('./records/records')(phoneBook);