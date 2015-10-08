var express = require('express');
var phoneBookRouter = express.Router();
var Person = require(__dirname + '/../models/phonebook');
var jsonParser = require('body-parser').json();
var errorHandler = require(__dirname + '/../lib/handlerError');

phoneBookRouter.post('/person', jsonParser, function(req, res) {
  var newPerson = new Person();
  newPerson.name = req.body.name;
  newPerson.phoneNumber = req.body.phoneNumber;
  if(newPerson.name && newPerson.phoneNumber) {
    newPerson.save(function(err, data) {
      if (err) return errorHandler(err, res);
      res.json(data);
    });
  } else {
    return errorHandler('Input data is incorrect', res);
  }
});

phoneBookRouter.get('/person', function(req, res) {
  Person.find({}, function(err, data) {
    if (err) errorHandler(err, res);
    res.json(data);
  });
});

phoneBookRouter.get('/person/:id', function(req, res) {
  Person.find({_id: req.params.id}, function(err, data) {
    if (err) errorHandler(err, res);
    res.json(data);
  });
});

phoneBookRouter.put('/person/:id', jsonParser, function(req, res) {
  var newPerson = req.body;
  delete newPerson._id;
  if(newPerson.name && newPerson.phoneNumber) {
    Person.update({_id: req.params.id}, newPerson, function(err, data) {
      if (err) errorHandler(err, res);
      res.json({msg:'success'});
    });
  } else {
    return errorHandler.standard('Input data is incorrect');
  }
});

phoneBookRouter.delete('/person/:id', function(req, res) {
  Person.find({_id: req.params.id}, function(err, data) {
    if (err) return errorHandler(err, res);
    if (data.length) {
      Person.remove({_id: req.params.id}, function(err) {
        if (err) errorHandler(err, res);
        res.json({msg:'success'});
      });
    } else {
      res.json({msg:'This person does not exist'});
    }
  });
});

module.exports = phoneBookRouter;