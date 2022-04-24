const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
})

app.use(express.static('views'))

app.get("/api/:date", function(req, res) {
    let date = new Date(req.params.date)
    

    if(isNaN(Date.parse(req.params.date))) {
        let unix = parseInt(req.params.date)
        if(new Date(unix) != "Invalid Date") {
            res.json({unix: unix, utc: new Date(unix).toUTCString()})
        } else {
            res.json({error: "Invalid Date"})
        }
    } else {
        res.json({unix: Date.parse(date), utc: date.toUTCString()})
    }

})

app.get('/api/', function(req, res) {
    const dateNow = Date.now()
    let date = new Date(dateNow).toUTCString()
    
    res.json({unix: dateNow, utc: date})
})

app.listen(8080, () => {
    console.log("Listen server 8080 port")
})