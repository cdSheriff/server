const express = require('express')
const app = express()
app.get('/', (req, res) => {
	res.send('look I can change!')
})


app.listen(3000, () => console.log('Server running on port 3000'))