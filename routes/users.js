var mongodb = require('mongodb');
var express = require('express');
var _ = require('underscore');
var router = express.Router();

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://socialmediauser:password@ds031277.mongolab.com:31277/socialmedia';

router.use(function(req, res, next) {
    next();
});

/* GET current user */
router.get('/current', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        res.status(500).send('Error connecting to database');
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);
        db.collection("users").find().toArray(function(err, result){
            if(err){
                res.status(500).send('Error retrieving news feed items.');
            } else{
                if(result.length > 0){
                    res.json({data: result[0]});
                } else{
                    res.status(500).send('No user found.');
                }
            }
            db.close();   
        });
      }
    });
});

/* GET all users */
router.get('/friends/:user_id', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        res.status(500).send('Error connecting to database');
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);
          console.log(mongodb.ObjectId(req.params['user_id']));
        db.collection("users").find({ _id: mongodb.ObjectId(req.params['user_id'])})
            .toArray(function(err, currentUserResult){
                if(err){
                    res.status(500).send('Error retrieving user.');
                } else{
                    if(currentUserResult.length > 0){
                        var currentUser = currentUserResult[0];
                        var ids = [];
                        _.each(currentUser.friend_ids, function(id){
                            ids.push(mongodb.ObjectId(id));
                        });
                        console.log(currentUser.friend_ids);
                        db.collection("users")
                            .find( { _id: { $in: ids } } )
                            .toArray(function(err, result){
                                if(err){
                                    console.log(err);
                                    res.status(500).send('Error retrieving friends list.');
                                } else{
                                    res.json({data: result});
                                }
                                db.close();   
                        });
                    } else{
                        res.status(500).send('Current user not found');
                    }
            }
        });
      }
    });
});

module.exports = router;