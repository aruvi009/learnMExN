
/**
 * Note Route definitions
 * 
 * INFO : 
 * We are using the express object to get the request methods and assign a callback
 * We are using the mongodb connection object to query the database and use database functions
 * 
 */

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    app.post('/notes', (req, res) => {
        const note = {
            title: req.body.title,
            text: req.body.desc,
            age: 21
        }

        db.collection('notes').insertOne(note, (err, result) => {
            if (err)
                return res.send({'error' : 'Post action failed'});
            
            return res.send(result.ops[0]);
        })
    })

    app.get('/notes/:id', (req,res) => {
        const id = req.params.id;

        const details = {
            '_id' : new ObjectID(id)
        }

        db.collection('notes').findOne(details, (err, item) => {
            if (err)
                return res.send({'error' : 'Get action failed'});
            
            return res.send(item);
        })
    })

    app.put('/notes/:id', (req, res) => {    
        const id = req.params.id;    
        const details = { 
            '_id': new ObjectID(id) 
        };    
        const note = { 
            text: req.body.body, 
            title: req.body.title, 
            age: req.body.age 
        };    
        
        db.collection('notes').update(details, note, (err, result) => {      
            if (err) {          
                return res.send({'error':'An error has occurred'});      
            }
                     
            return res.send(note);       
        });  
    });

    app.delete('/notes/:id', (req, res) => {    
        const id = req.params.id;    
        const details = { 
            '_id': new ObjectID(id) 
        };   
        
        db.collection('notes').remove(details, (err, item) => {      
            if (err) {        
                return res.send({'error':'An error has occurred'});      
            }
            
            return res.send('Note ' + id + ' deleted!');
        });  
    });

}