/* 
 * node.js file for CS361 Group 20 project.  This file requires 3 command line
 * arguments after the filename:  port, ONID, and password.
 */

var express = require('express');

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_' + process.argv[3],
  password        : process.argv[4],
  database        : 'cs361_' + process.argv[3]
});

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(express.static('views/images'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.use(express.static('public'));

//Render login page
app.get('/', function(req, res, next){
  var context = {};
  res.render('login', context);
});

//Render main page
app.get('/home', function(req, res, next){
  var context = {};
  console.log("Request received");
  res.render('home', context);
});

//Render login failure page
app.get('/invalidlogin', function(req, res, next){
  var context = {};
  res.render('loginfailure', context);
});

//Add a new user to the database
app.post('/addUser', function(req, res, next){
  var context = {};
  pool.query("INSERT INTO siteUser(firstName, lastName, email, zipCode, "
  + "userName, password) VALUES (?, ?, ?, ?, ?, ?)", [req.body.fname,
  req.body.lname, req.body.email, req.body.zip, req.body.userId,
  req.body.password], function(err, result){
    if(err){
      next(err);
      return;
    }

    //res.send(context.results);
    console.log(req.body.fname);
    //res.send(req.body.userId);
    //res.type('text/plain');
    //res.send(null);
    context.results = JSON.stringify(result);
    console.log(context.results);
    if (result.affectedRows)
    {
      res.sendStatus(200);
//      res.send(null);
    }
    console.log("Praise the Sun!");
    //res.render('home');
  });
  //res.render('home');
});

/*
//Render new user entry page
app.post('/addUser', function(req, res, next){
  var context = {};
  res.render('register', context);

  var firstNameEntry = req.param('firstNameEntry');
  var lastNameEntry = req.param('lastNameEntry');
  var emailEntry = req.param('emailEntry');
  var addressEntry = req.param('addressEntry');
  var zipEntry = req.param('zipEntry');
  var stateEntry = req.param('stateEntry');
  var userName = req.param('userName');
  var pwBar1 = req.param('pwBar1');

  var context = {};
  var myResponse = '';
  pool.getConnection(function (err, connection) {
      connection.query("INSERT INTO siteUser (firstName, lastName, address, zipCode, state, userName, password) VALUES (?, ?, ?, ?, ?, ?, ?)", [firstNameEntry, lastNameEntry, addressEntry, zipEntry, stateEntry, userName, pwBar1]); 
      connection.release();
  });
      
});
*/

//Render edit account details page
app.get('/register', function (req, res, next) {
    var context = {};
    res.render('register', context);
});

/*
//Render edit account details page
app.get('/editaccount',function(req, res, next){
  var context = {};
  res.render('editaccount', context);
});
*/

//Render forgot page
app.get('/forgot', function (req, res, next) {
    var context = {};
    res.render('Forgot', context);
});

//Attempt to login by querying siteUser table.  If credentials are invalid, page reloads if success page goes to main user page. 
app.post('/attemptLogin', function (req, res, next) {
    var context = {};
    var tempUserName = req.param('userName');
    var tempPassword = req.param('password');
    var temp = '';
    var myResponse='';
    pool.getConnection(function (err, connection) {
        
        connection.query("SELECT * FROM siteUser WHERE userName = ? AND password = ?", [tempUserName, tempPassword], function (err, rows, fields) {
            if (err) {
                next(err);
                return;
            }
            context.results = JSON.stringify(rows[0]);

            try {
                myResponse = JSON.parse(context.results);
                temp = myResponse.userId;
            } catch (err) {
            }

            if (temp != '') {
            console.log("TEMP VALUE IS:"+temp); 
            console.log("tempUserName:"+tempUserName);
                res.render('Forgot', context);
            } else {
                res.render('login', context);
            }
        });
        connection.release();
    });
});

//Render 404 page when page cannot be found
app.use(function(req,res){
  res.status(404);
  res.render('404');
});
//Render 500 page when a 500 error occurs
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

//Set application port
app.listen(app.get('port'), function(){
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});

