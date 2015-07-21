var express = require('express');

// routes ==================================================
require('./app/routes/users.js')(app, passport);
var router = require('./app/routes/hairstyle'); 
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

require('./config/passport')(passport); // pass passport for configuration

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'i' })); // session secret
app.use(passport.initialize());
app.use(passport.session());

// set the static files location /public/img will be /img for users

 app.use('/api', router);
// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log(port + ' up and running');

// expose app           
exports = module.exports = app;