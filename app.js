var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

var MongoClient = require('mongodb').MongoClient;
var dbName = 'test';
var db = Object;

MongoClient.connect('mongodb://vijay:root@ds125938.mlab.com:25938/demo', function(err, client) {
    if (err) {
        console.error(err);
        return 0;
    }

    console.log("Connected successfully to server");
    db = client.db(dbName);

});


app.get('/',function (req, res)  {
    res.sendFile('/index.html', {
        root: __dirname
    });
});

app.post('/survey',function(req, res){
    console.log(req.body);
    var collection = db.collection('consumption');
    collection.insertOne(req.body, function(err, result) {
        // assert.equal(err, null); // --> checks for two equal values, else throws error
        if (err) {
            console.error(err)
        }
        else
            console.log('inserted!');
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

