const express = require('express')
const fetch = require('node-fetch')
const JSDOM = require('jsdom').JSDOM
const http = require('http')
const url = require('url')

const app = express()

app.use(function (req, res, next) {
	res.header('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');	
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
	// express.static('public');
	next();
	
})

app.get('*', (req, res) => {
   res.send('mqtt.');
});

app.listen(4000, () => console.log('MQTT running on port 4000'))