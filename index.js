var express = require('express');
var app = express();
var phoneBookRouter = require(__dirname + '/routes/phoneRouter');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/phonebook');

app.use(express.static(__dirname + '/build'));
app.use('/api', phoneBookRouter);

app.listen(port, function() {
	console.log('Server up on port: ' + port);
});