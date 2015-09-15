var chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  mongoose = require('mongoose'),
  url = 'localhost:3000/api';
process.env.MONGO_URL = 'mongodb://localhost/person_test';
require(__dirname + '/../index.js');

chai.use(chaiHttp);

describe('api test', function(done) {
  
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
        done();
      });
  });

  it('should be able to get person', function(done) {
    chai.request('localhost:3000/api')
      .get('/person')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
});