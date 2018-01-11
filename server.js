var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var session = require('express-session');
app.use(session({secret: 'whatthefinhmang', resave: true, saveUninitialized: true}));
var cookieParser = require('cookie-parser');
app.use(cookieParser('whatthefinhmang'));

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/TextRap')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var path = require('path');

var moment = require('moment');

app.use(express.static(path.join(__dirname, './public/dist')));

require('./server/config/mongoose.js');

// Schemas
var Schema = mongoose.Schema;

var routes_setter = require('./server/config/routes.js');
routes_setter(app);
// Routes for talking to database
//Testing Git



app.listen(8000, function(){
    console.log("Listening on port 8000.")
})
