const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';

function getUsers(db, callback) {
    let collection = db.collection('users');
    users = collection.find({}).toArray( (err, users) => {
        assert.equal(err, null);
        console.log("I've got all the users");
        callback(users);
    });
}

function addUser(db, callback, user) {
  let collection = db.collection('users');
  collection.insertOne(user, (err, result) => {
    assert.equal(err, null);
    console.log("New user has been added to the database");
    callback(result);
  });
}

function removeUser(db, callback, userId) {
  let collection = db.collection('users');
  collection.deleteOne({ "_id": ObjectId(userId)}, (err, result) => {
    assert.equal(err, null);
    console.log("A user has been deleted");
    callback(result);
  });
}

module.exports = {
    getUsers: (callback)=> {
        MongoClient.connect(url, (err, db) => {
            assert.equal(null, err);
            console.log("I'm getting all the users from the database...");
            getUsers(db, (users) => {
                db.close();
                if ( callback )
                    callback(users);
            });
        });
    },
    putUser: (firstname, lastname, age) => {
        let newUser = {
            firstname: firstname,
            lastname: lastname, 
            age: age
        }
        MongoClient.connect(url, (err, db) => {
            assert.equal(null, err);
            console.log("I'm adding a new user to the database...");
            addUser(db, () => db.close(), newUser);
        });
    },
    deleteUser: (userId) => {
        MongoClient.connect(url, (err, db) => {
            assert.equal(null, err);
            console.log("I'm deleting some user");
            removeUser(db, () => db.close(), userId);
        });
    }
}