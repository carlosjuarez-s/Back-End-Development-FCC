const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//MONGODB
const url = 'mongodb+srv://admin:Admin@cluster0.35qjn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(url)
    .then(() => console.log("Connect to MONGO"))
    .catch(err => console.log(err))

const { Schema } = mongoose

const UrlSchema = new Schema({
    oldUrl: String,
    newUrl: {
        type: Number, 
        default: () => Math.random()*900,
        index: {unique: true}
    }
})

let Url = mongoose.model("Url", UrlSchema)


//APP
app.use(express.static('views'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.post('/api/shorturl', async(req, res) => {
    const regx = /^https/

    if(regx.test(req.body.url)) {
        let url = new Url({
            oldUrl: req.body.url,
        })
        await url.save()
        res.json({original_url: url.oldUrl, short_url: url.newUrl})
    } else {
        res.json({error: 'invalid url'})
    }

    
})

app.get('/api/shorturl/:url', async(req, res) => {
    let url = await Url.findOne({newUrl: req.params.url})

    res.writeHead(301, {
        Location: url.oldUrl
    }).end()
})

app.listen(8080, () => {
    console.log("Server Run!")
})

