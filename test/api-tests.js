var chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  mongoose = require('mongoose'),
  url = 'localhost:3000/api';
process.env.MONGO_URL = 'mongodb://localhost/person_test';
require(__dirname + '/../index.js');

chai.use(chaiHttp);

describe('api test', function(done) {
  
  var personId;

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('should create a new person', function(done) {
    chai.request('localhost:3000/api')
      .post('/person')
      .send({name:"Roman", phoneNumber: 9164942994})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Roman');
        expect(res.body.phoneNumber).to.eql(9164942994);
        personId = res.body._id;
        done();
      });
  });

  it('should create a second person', function(done) {
    chai.request('localhost:3000/api')
      .post('/person')
      .send({name:"Andrew", phoneNumber: 9164942995})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Andrew');
        expect(res.body.phoneNumber).to.eql(9164942995);
        personId = res.body._id;
        done();
      });
  });

  it('should be able to get person by id', function(done) {
    chai.request('localhost:3000/api')
      .get('/person/' + personId)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should be able to get all persons', function(done) {
    chai.request('localhost:3000/api')
      .get('/person')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.length).to.eql(2);
        done();
      });
  });

  it('should be able to change some', function(done) {
    chai.request('localhost:3000/api')
      .put('/person/' + personId)
      .send({name:"Roman2", phoneNumber: 9164942996})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('success');
        done();
      });
  });

  it('should be able to check for changes', function(done) {
    chai.request('localhost:3000/api')
      .get('/person/' + personId)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body[0].name).to.eql('Roman2');
        done();
      });
  });

  it('should be able to delete phone', function(done) {
    chai.request('localhost:3000/api')
      .delete('/person/' + personId)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('success');
        done();
      });
  });



});