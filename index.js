'use strict';

var express = require('express');
var request = require('request');
var app = express();
var port = Number(process.env.PORT || 3000);

app.set('json spaces', 2); // Tell Express to pretty print json

app.get('/', function (req, res) {
	// Create a plain js object for the json
	var genericMessage = {
		username: null,
		password: null,
		apikey: null,
	};

	res.json(genericMessage); // Response: send the variable as json
});


// EXAMPLE ENDPOINT: http://localhost:3000/hi
app.get('/hi', function (req, res) {
  res.send('Hi There!'); // sent a plain text response
});

app.listen(port, function () {
	console.log('App server is running on http://localhost:' + port);
});