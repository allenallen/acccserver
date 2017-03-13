var express = require('express');
var router = express.Router();
var app = express()
var admin = require("firebase-admin");
var url = require( "url" );
var queryString = require( "querystring" );
var serviceAccount = require("../accckey.json");
var bodyParser = require("body-parser");
var url = require( "url" );
var queryString = require( "querystring" );


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arcenalcarcarecenterserver.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: "service-worker"
  }
});

var db = admin.database();

router.get('/query_customer', function(req,res,next){
      console.log("here");
      var theUrl = url.parse( req.url );
      console.log(theUrl);
      var queryObj = queryString.parse( theUrl.query );
      console.log(queryObj);
      var obj = JSON.parse( queryObj );

      var ref = db.ref("Customer");
      console.log("here2");
      console.log(obj);

      switch(obj.query){
            case "single":
                  ref.orderByChild("lastname").startAt(obj.lastname).on("value", function(snapshot){
                        res.json(snapshot);
                  });
                  break;
            default:
                  var ref = db.ref("Customer");
                  ref.orderByChild("lastname").on("value", function(snapshot){
                        res.json(snapshot);
                  });
      }


});

router.post('/new_customer', function(req,res,next){
      var ref = db.ref("Customer");
      var data = {};
      data["firstname"] =  req.body.firstname;
      data["lastname"] =  req.body.lastname;
      data["address"] =  req.body.address;
      data["carmake"] =  req.body.carmake;
      data["plate"] =  req.body.plate;
      data["contact"] =  req.body.contact;

      var saveRef = ref.push();

      saveRef.set(data, function(error){
            if(error){
                  res.json({"error":error});
            } else {
                  data["id"] = saveRef.key;
                  res.json({"status":"data saved", data:data});
            }
      });
});

router.post('/update_customer', function (req,res,next){
      var child = db.ref("Customer").child(req.body.id);
      var data = {};
      data["firstname"] =  req.body.firstname;
      data["lastname"] =  req.body.lastname;
      data["address"] =  req.body.address;
      data["carmake"] =  req.body.carmake;
      data["plate"] =  req.body.plate;
      data["contact"] =  req.body.contact;

      child.update(data, function(error){
            if(error){
                  res.json({"error":error});
            } else {
                  res.json({status:"data saved",data:data});
            }
      });
});

router.post('/new_employee', function(req,res,next){
      var ref = db.ref("Employee");
      var data = {};
      data["firstname"] =  req.body.firstname;
      data["lastname"] =  req.body.lastname;
      data["address"] =  req.body.address;
      data["contact"] =  req.body.contact;

      var saveRef = ref.push();

      saveRef.set(data, function(error){
            if(error){
                  res.json({"error":error});
            } else {
                  data["id"] = saveRef.key;
                  res.json({"status":"data saved",data:data});
            }
      });
});

router.post('/update_employee', function (req,res,next){
      var child = db.ref("Employee").child(req.body.id);
      var data = {};
      data["firstname"] =  req.body.firstname;
      data["lastname"] =  req.body.lastname;
      data["address"] =  req.body.address;
      data["contact"] =  req.body.contact;

      child.update(data, function(error){
            if(error){
                  res.json({"error":error});
            } else {
                  res.json({"status":"data saved",data:data});
            }
      });
});

router.post('/new_job_order', function(req,res,next){
      var ref = db.ref("Job Order/"+req.body.jonumber);
      var data = {};
      data["customerid"] =  req.body.customerid;
      data["date"] =  req.body.date;
      data["employees"] =  req.body.employees;
      data["jobdescription"] =  req.body.jobdescription;
      data["partsids"] =  req.body.partsids;
      data["labor"] =  req.body.labor;
      data["totalamount"] =  req.body.totalamount;

      ref.set(data, function(error){
            if(error){
                  res.json({"error":error});
            } else {
                  data["jonumber"] = req.body.jonumber;
                  res.json({"status":"data saved",data:data});
            }
      });
});

router.post('/update_job_order', function (req,res,next){
      var child = db.ref("Job Order").child(req.body.jonumber);
      var data = {};
      data["customerid"] =  req.body.customerid;
      data["date"] =  req.body.date;
      data["employees"] =  req.body.employees;
      data["jobdescription"] =  req.body.jobdescription;
      data["partsids"] =  req.body.partsids;
      data["labor"] =  req.body.labor;
      data["totalamount"] =  req.body.totalamount;

      child.update(data, function(error){
            if(error){
                  res.json({"error":error});
            } else {
                  res.json({"status":"data saved",data:data});
            }
      });
});




module.exports = router;
