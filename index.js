const express = require('express')
const fetch = require('node-fetch')
const JSDOM = require('jsdom').JSDOM
const http = require('http')
const url = require('url')

const app = express()
// app.get('/', (req, res) => {
// 	res.send('look I can change!')
// })

// app.use(express.static('public'))

app.use(function (req, res, next) {
	res.header('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');	
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
	next();
})

app.get('/', (req, res) => {
	// let q = url.parse(request.url, true);
	console.log(req);
	// locName(q.query.ID).then(resp => console.log('got this back: ' + resp))
	// regexIt(q.query.ID).then(resp => res.json(resp))
	res.json({"foo": "bar"});
})

app.listen(3000, () => console.log('Server running on port 3000'))

function locName(ID) {
	let url = 'http://www.bom.gov.au/australia/tides/print.php?aac=' + ID + '&type=tide&tz=Australia/Adelaide&tz_js=ACDT'

	return fetch(url)
		.then(resp => resp.text())
		.then(text => {
			let dom = new JSDOM(text)
			let location = dom.window.document.querySelector("h2").textContent
			return location.split('–')[0].slice(0,-1)
		})

}

function parseDay(m, method = false) {
	let tidesArray = []
	let temp
	if (method == false) {
		let dayReg = /\<h3\>(.*)\<\/h3\>/
		let headerReg = /\<tr\>([\s\S]*?)\<\/tr\>/mg
		let wayReg = /instance\s(.*)\"\>/
		let timeReg = /local\=\"([\s\S]*?)\+/
		do {
			n = headerReg.exec(m)
			if (n && n[1].includes('instance ')) {
				temp = timeReg.exec(n[1])[1].replace(/-|:/g,'').slice(0,-2)
				if (wayReg.exec(n[1])[1].includes('high')) {
					temp = temp + 'H'
				} else {
					temp = temp + 'L'
				}
				tidesArray.push(temp)
			}
		} while (n)
	} else {
		console.log('t/f error')
	}
	return tidesArray
}

function regexIt(ID) {
	// TURN ID INTO A TIMEZONE TOO, MIGHT HAVE TO JUST GO THROUGH ALL THE ID'S TO GET THERE

	// let url = 'http://www.bom.gov.au/australia/tides/print.php?aac=SA_TP036&type=tide&date=29-1-2019&region=SA&tz=Australia/Adelaide&tz_js=ACDT&days=7'
	let url = 'http://www.bom.gov.au/australia/tides/print.php?aac=' + ID + '&type=tide&tz=' + tz + '&tz_js=ACDT'
	let regex = /(?=\<h3\>)([\s\S]*?)\<\/tbody\>/mg
	let tides = []

	fetch(url)
		.then(resp => resp.text())
		.then(text => {
			do {
				m = regex.exec(text);
				if (m) {
					let parsedTides = parseDay(m[1])
					for (let i = 0; i < parsedTides.length; i++) {
						tides.push(parsedTides[i])
					}
				}
			} while (m)
			console.log(tides)
		})
}