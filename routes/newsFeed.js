var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://socialmediauser:password@ds031277.mongolab.com:31277/socialmedia';

router.use(function(req, res, next) {
    next();
});

/* GET news feed items. */

router.get('/items/:user_id', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        res.status(500).send('Error connecting to database');
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);
        db.collection("news_feed_items").find().toArray(function(err, result){
            if(err){
                res.status(500).send('Error retrieving news feed items.');
            } else{
                res.json({data: result});
            }
            db.close();   
        });
      }
    });
});

/* Post a news feed item. */
router.post('/item', function(req, res, next) {
    console.log(req.body);
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);
          db.collection("news_feed_items").insert(req.body, function(err, result){
              if(err){
                res.status(500).send('Status could not be updated');
              } else{
                res.status(200).send('Status saved successfully!');
              }
              db.close();
          });
      }
    });
});

module.exports = router;