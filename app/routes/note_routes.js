
module.exports = function(app, db) {

    app.post('/notes', (req, res) => {

        console.log("success");
        console.log(req.body);
        res.send("Hello");

    })


}