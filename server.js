const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ 
    extended: true 
}));

// MongoClient.connect

//Routes
require('./app/routes')(app, {});

app.listen(port, () => {
    console.log("Live on port : " + port);
})