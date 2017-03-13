var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");
var serviceAccount = require("../accckey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arcenalcarcarecenterserver.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: "service-worker"
  }
});

var db = admin.database();

/* GET home page. */
router.get('/', function(req, res, next) {
      var ref = db.ref("Parts");
      ref.set({
                    parts1: {
                      date: "June 23, 1912",
                      name: "screw"
                    },
                    parts2: {
                      date: "December 9, 1906",
                      name: "nail"
                    }
                  });

ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
  res.json({"home": "welcome"});
});

router.get('/about', function(req,res){
	res.render('about', {title: 'My Bags bite'});
});

router.get('/login', function(req,res){
	res.render('login',{title: 'My Bags bite'});
});

router.get('/register',function(req,res){
	res.render('register');
});

router.get('/logout', function(req,res){
      Firebase.auth().signOut().then(function(){
            req.session.destroy();
            res.redirect('/');
      }, function(error){
            console.log(error);
      });

});


module.exports = router;
