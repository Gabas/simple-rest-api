var mongoose = require('mongoose');

var phoneBookSchema = new mongoose.Schema({
	name: String,
	phoneNumber: Number
}, {
	collection: 'person'
});

module.exports = mongoose.model('Person', phoneBookSchema);