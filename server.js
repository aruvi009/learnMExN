const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const config = require('./config/db')

//Router Object
const router = express.Router();

//Import models
const models = require('./app/models');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ 
    extended: true 
}));

// MongoClient.connect(config.url, {useUnifiedTopology: true}, (err, database) => {
models.connectDB().then(async () => {

    // const db = database.db('todolist');

    //User the connection function to get a db connection instance
    db = models.connect();

    /**
     * Add Routes
     * 
     * As per our requirement, we have routes for note and user.
     * Note router used the database connection (db) instance we created as we are querying the mongodb directly
     * User router has mongoose instance created, so the default connection from connectDB() is available there
     * 
     * Parameters passed
     * app      - Our express app instance
     * db       - Just in this case, for the note route to work with direct querying the mongodb and without ORM object.
     * router   - Express router object to define routes to be used in the application
     * 
     */
    require('./app/routes')(app, db, router);

    app.listen(port, () => {
        console.log("Live on port : " + port);
    })    
})
