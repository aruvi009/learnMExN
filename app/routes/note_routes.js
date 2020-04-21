
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
                res.send({'error' : 'Post action failed'});
            
            res.send(result.ops[0]);
        })
    })

    app.get('/notes/:id', (req,res) => {
        const id = req.params.id;

        const details = {
            '_id' : new ObjectID(id)
        }

        db.collection('notes').findOne(details, (err, item) => {
            if (err)
                res.send({'error' : 'Get action failed'});
            
            res.send(item);
        })
    })


}