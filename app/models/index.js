const mongoose = require('mongoose');
const config = require('../../config/db');

//Initiate models
var User = require('./user');

/**
 * DOC URL : https://mongoosejs.com/docs/connections.html#multiple_connections
 * 
 * Mongoose creates a default connection when you call mongoose.connect()
 */
const connectDB = () => {
    return mongoose.connect(config.url, { 
        useCreateIndex: true,
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      });
}

/**
 * DOC URL : https://mongoosejs.com/docs/connections.html#multiple_connections
 * 
 * You may need multiple connections to MongoDB for several reasons. One reason is if you have multiple databases 
 * or multiple MongoDB clusters. Another reason is to work around slow trains. 
 * 
 * The mongoose.createConnection() function takes the same arguments as mongoose.connect() 
 * and returns a new connection.
 */
const connect = () => {
    return mongoose.createConnection(config.url, { 
        useCreateIndex: true,
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      });
} 

/**
 * Now we have 3 objects to return : 
 * 
 * connectDB    - Mongoose-Mongo Connection object created through connect(), that persists through the mongoose library
 * connect      - A new mongodb connection created through createConnection(). We will have to manually send the connection 
 *                  object to refer to this connection instance.
 * User         - Instance of User Model
 */
module.exports = {
    connectDB, connect, User
}