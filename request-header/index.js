const express = require('express')
const app = express()

app.use(express.static('views'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/whoami', (req, res) => {
    let response = {
        ipaddress: req.ip,
        language: req.headers['accept-language'],
        software: req.headers['user-agent']
    }

    res.json(response)
})

app.listen(8080, () => {
    console.log("Server run!")
})