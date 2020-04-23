
/**
 * HELPFUL : https://expressjs.com/en/guide/routing.html
 * 
 */

module.exports = function(app, db, router) {
    /**
     * Method 1
     * We call the note routes by passing instance od express and database
     */
    const noteRoutes = require('./note_routes');
    noteRoutes(app, db);

    /**
     * Method 2
     * We get the user sub routes from user routes after passing the router object
     * We define all user sub routes should be called from the /users path
     */
    var user = require('./user_routes')(router);
    app.use('/users', user);
}