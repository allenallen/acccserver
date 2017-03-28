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
      var theUrl = url.parse( req.url );
      var obj = queryString.parse( theUrl.query );
      var ref = db.ref("Customer");

      switch(obj.query){
            case "single":
                  ref.orderByChild("lastname").equalTo(obj.lastname).on("value", function(snapshot){
                        res.json(snapshot);
                  });
                  break;
            default:
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

router.get('/query_employee', function(req,res,next){
      var theUrl = url.parse( req.url );
      var obj = queryString.parse( theUrl.query );
      var ref = db.ref("Employee");

      switch(obj.query){
            case "single":
                  ref.orderByChild("lastname").equalTo(obj.lastname).on("value", function(snapshot){
                        res.json(snapshot);
                  });
                  break;
            default:
                  ref.orderByChild("lastname").on("value", function(snapshot){
                        res.json(snapshot);
                  });
      }
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

router.get('/query_job_order', function(req,res,next){
      var theUrl = url.parse( req.url );
      var obj = queryString.parse( theUrl.query );
      var ref = db.ref("Job Order");

      switch(obj.query){
            case "single":
                  ref.orderByChild("customerid").equalTo(obj.customerid).on("value", function(snapshot){
                        res.json(snapshot);
                  });
                  break;
            default:
                  ref.orderByChild("jonumber").on("value", function(snapshot){
                        res.json(snapshot);
                  });
      }
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
      data["totalamount"] = req.body.totalamount;
      data["ispaid"] = req.body.ispaid;
      data["paymentdate"] = req.body.paymentdate;
      data["isreleased"] = req.body.isreleased;
      data["amount"] = req.body.amount;

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
      data["isPaid"] = req.body.ispaid;
      data["paymentdate"] = req.body.paymentdate;
      data["isReleased"] = req.body.isreleased;

      child.update(data, function(error){
            if(error){
                  res.json({"error":error});
            } else {
                  res.json({"status":"data saved",data:data});
            }
      });
});

router.get('/query_parts', function(req,res,next){
      var theUrl = url.parse( req.url );
      var obj = queryString.parse( theUrl.query );
      var ref = db.ref("Parts");

      switch(obj.query){
            case "single":
                  ref.orderByChild("date").equalTo(obj.date).on("value", function(snapshot){
                        res.json(snapshot);
                  });
                  break;
            default:
                  ref.orderByChild("date").on("value", function(snapshot){
                        res.json(snapshot);
                  });
      }
});

router.post('/new_parts', function(req,res,next){
      var ref = db.ref("Parts");
      var data = {};
      data["name"] =  req.body.name;
      data["date"] =  req.body.date;
      data["quantity"] =  req.body.quantity;
      data["amount"] =  req.body.amount;
      data["totalamount"] =  req.body.totalamount;
      data["receiptnumber"] =  req.body.receiptnumber;
      data["manufacturer"] =  req.body.manufacturer;

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

router.post('/update_parts', function (req,res,next){
      var child = db.ref("Job Order").child(req.body.id);
      var data = {};
      data["name"] =  req.body.name;
      data["date"] =  req.body.date;
      data["quantity"] =  req.body.quantity;
      data["amount"] =  req.body.amount;
      data["totalamount"] =  req.body.totalamount;
      data["receiptnumber"] =  req.body.receiptnumber;
      data["manufacturer"] =  req.body.manufacturer;
      
      child.update(data, function(error){
            if(error){
                  res.json({"error":error});
            } else {
                  res.json({"status":"data saved",data:data});
            }
      });
});



module.exports = router;
