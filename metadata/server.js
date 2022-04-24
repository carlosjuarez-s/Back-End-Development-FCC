var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer')
const bodyParser = require('body-parser')
const fs = require('fs')
const mongoose = require('mongoose')

const url = 'mongodb+srv://admin:Admin@cluster0.35qjn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(url)

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))

const upload = multer({ dest: 'upload/' })
var type = upload.single('upfile')

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', type, async(req, res) => {
  const { file } = req

  reponse = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  }

  res.json(reponse)
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
