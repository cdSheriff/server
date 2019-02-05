const express = require('express')
const app = express()
// app.get('/', (req, res) => {
// 	res.send('look I can change!')
// })

// app.use(express.static('public'))

app.use(function (req, res, next) {
	res.header('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
	next();
})

app.get('/', (req, res) => {
	res.json({"foo": "bar"});
})

app.listen(3000, () => console.log('Server running on port 3000'))