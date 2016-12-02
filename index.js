'use strict';

var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser')
var uuidV4 = require('uuid/v4');
var port = Number(process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces', 2); // Set Express to pretty print json
app.set('view engine', 'ejs'); // Set Express's view engine to EJS

// Declare the schema as a global variable/object to set values to later
var responseMessage = {
	username: null,
	password: null,
	token: null,
};

/******************** EXPRESS ENDPOINTS ********************/

// Default Endpoint
app.get('/', function (req, res) {
	res.render('index'); // Render an HTML page from an .ejs template
});

// EXAMPLE ENDPOINT: http://localhost:3000/hi
app.get('/hi', function (req, res) {
  res.send('Hi There!'); // sent a plain text response
});

// EXAMPLE ENDPOINT - Query Parameters:
// http://localhost:3000/user?username=nick&password=awesomestuff&token=123456789
app.get('/user', function (req, res) {
	var genericMessage = {
		username: req.query['username'],
		password: req.query['password'],
		token: req.query['token'],
	};
	res.json(genericMessage);
});

// EXAMPLE ENDPOINT - API Key: Provide a fake external endpoint
app.get('/token', function(req, res) {
	var token = {
		token: uuidV4() // generates a random UUID
	};
	res.json(token);
});

/* EXAMPLE ENDPOINT - POST requests */
app.post('/submit', function(req, res) {
	console.log(req.body); // Form POST request body

	// Update the responseMessage values
	responseMessage.username = req.body.username;
	responseMessage.password = req.body.password;

	// Set the external request options
	var targetURL = req.headers.host; // get the current host address in case it isnt localhost
	var options = {
		method: 'GET',
	  url: 'http://'+ targetURL + '/token',
	  headers: {
			'Content-Type': 'application/json'
		}
	};

	// Send the external request
	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
		var responseBody = JSON.parse(body); // parse the response body
			console.log(responseBody);
		responseMessage.token = responseBody.token; // Update the responseMessage values
		res.json(responseMessage); // return the final resonse to the /submit endpoint
	})
});

app.listen(port, function () {
	console.log('App server is running on http://localhost:' + port);
});
