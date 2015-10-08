require('../../app/js/client');

describe('resource service', function() {
  beforeEach(angular.mock.module('phoneBookApp'));

  var ResourceService;
  var $httpBackend;
  var notesResource;
  beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
    ResourceService = Resource;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get requets', function() {
    $httpBackend.expectGET('/api/person').respond(200, [{record: 'Roman'}]);
    ResourceService.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data.data)).toBe(true);
    });
    $httpBackend.flush();
  });

  it('should post a record', function() {
    $httpBackend.expectPOST('/api/person', {name: 'Andrew', phoneNumber: 123}).respond(200, {_id: 1, msg: 'created'});
    ResourceService.create({name: 'Andrew', phoneNumber: 123}, function(err, data) {
      expect(err).toBe(null);
      expect(data.data.msg).toBe('created');
    });
    $httpBackend.flush();
  });

  it('should be able to delete a record', function() {
    $httpBackend.expectDELETE('/api/person/123').respond(200, {_id: 1, msg: 'deleted'});
    ResourceService.delete({_id: 123}, function(err, data) {
      expect(err).toBe(null);
      expect(data.data.msg).toBe('deleted');
    });
    $httpBackend.flush();
  });
});