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
  database        : 'group20'
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
  res.render('home', context);
});

//Render login failure page
app.get('/invalidlogin', function(req, res, next){
  var context = {};
  res.render('loginfailure', context);
});

//Render new user entry page
app.get('/register', function(req, res, next){
  var context = {};
  res.render('register', context);
});

//Render edit account details page
app.get('/editaccount',function(req, res, next){
  var context = {};
  res.render('editaccount', context);
});

app.get('/forgot', function (req, res, next) {
    var context = {};
    res.render('Forgot', context);

})



/*
app.use(function(req,res){
  res.status(404);
  res.render('404');
});*/

/*app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  //res.render('500');
});*/

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
