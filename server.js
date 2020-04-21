const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const config = require('./config/db')

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ 
    extended: true 
}));

MongoClient.connect(config.url, (err, database) => {
    if (err)
        return console.log(err)

    const db = database.db('todolist');

    //Routes
    require('./app/routes')(app, db);

    app.listen(port, () => {
        console.log("Live on port : " + port);
    })    
})
