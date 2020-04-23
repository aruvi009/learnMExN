

/**
 * User Route definitions
 * 
 * INFO : 
 * We are using the express router object to create subpaths and get the request methods and assign a callback
 * We are using the mongoose User model object to query the database and use database functions
 * 
 * HELPFUL : https://medium.com/@yugagrawal95/mongoose-mongodb-functions-for-crud-application-1f54d74f1b34
 * 
 */

module.exports = function (router) {

  /**
   * Get the User Model object from the model definition
   */
  var User = require('../models').User;

  //POST Method : INSERT into Users values {req.body}
  router.post('/', (req, res) => {
    const user = new User(req.body);

    //we can define methods in the db model that can be referenced from the Model instance to perform changes or validations.
    user.dudify();

    user.save(function (err, item) {
      if (err) {
        return res.send({ 'error': err.message });
      }
      return res.send(item);
    });
  })

  //PUT Method : UPDATE {req.body} from Users where id = ":id"
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    User.updateOne({ "_id": id }, { $set: body }, function (err, result) {
      if (err) {
        return res.send({ 'error': err.errmsg });
      }      
      return res.json(result);
    });
  });

  //GET Method : SELECT * from Users where id = ":id"
  router.get('/:id', (req, res) => {
    const id = req.params.id;

    User.findById(id, function (err, result) {
      if (err) {
        return res.send({ 'error': 'An error has occurred' });
      }
      return res.json(result);
    });
  });

  //GET Method : SELECT * from Users where quer.field = query.value
  router.get('/', (req, res) => {
    const { query } = req;

    User.find(query, function (err, result) {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      }
      return res.json(result);
    });
  });

  return router
}