require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('phoneBook controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('phoneBookApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('Should create a controller', function() {
    var controller = new $ControllerConstructor('mainController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.book)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('mainController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request when getAll() is called', function() {
      $httpBackend.expectGET('/api/person').respond(200, [{record: 'Roman'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.book[0].record).toBe('Roman');
    });

    it('should be able to create a record', function() {
      $httpBackend.expectPOST('/api/person', {name: 'Andrew', phoneNumber: 123}).respond(200, {_id: 1, msg: 'created'});
      $scope.create({name: 'Andrew', phoneNumber: 123});
      $httpBackend.flush();
      expect($scope.book[0].name).toBe('Andrew');
      expect($scope.newRecord.name).toBe(undefined);
    });

    it('should be able to update a record', function() {
      var record = {_id: 123, name: 'John2', phoneNumber: 1234};
      $httpBackend.expectPUT('/api/person/123', record).respond(200, {_id: 1, msg: 'updated'});
      $scope.update(record);
      $httpBackend.flush();
      expect(record.editing).toBe(false);
    });

    it('should be able to delete a record', function() {
      var record = {_id: 123, name: 'John2', phoneNumber: 1234};
      $scope.book = [];
      $scope.book.push(record);
      $scope.book.push({_id: 12345, name: 'John23', phoneNumber: 1234});
      $httpBackend.expectDELETE('/api/person/123').respond(200, {_id: 1, msg: 'deleted'});
      $scope.delete(record);
      $httpBackend.flush();
      expect($scope.book[0].name).toBe('John23');
    });
  });
});