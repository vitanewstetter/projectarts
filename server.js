var express = require("express"),
    // fs = require("fs"),
    // path = require("path"),
    passport = require("passport"),
    facebook = require("passport-facebook").Strategy;
    // google = require("passport-google-oauth").Strategy;
    //MongoClient = require("mongodb").MongoClient,
    //cors = require("cors"),
    //shortid = require('shortid');

passport.use(new facebook({
        clientID: '239772336432810',
        clientSecret: 'b9c2fac8c81daeec2356ba92d5f7b88a',
        callbackURL: 'http://localhost:3000/login/facebook/return'
    },
    function(accessToken, refreshToken, profile, cb) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
    }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

var app = express();

app.set('view engine', 'ejs');
//says directory where to find static files
app.use(express.static('public'));

//middleware
    app.use(require('morgan')('combined'));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.get("/", function(req, res){
    //UNCOMMENT BELOW TO CLEAR DB
    //db.collection('cards').remove({});
    console.log(req.method);
    console.log("index");
    console.log(req.user);
        res.render('index', { user: req.user });
});
//load browse page
app.get("/browse", function(req, res){
    console.log(req.method);
    console.log("browse");
    res.render('browse'), { user: req.user };
});


//go to facebook login
app.get('/logout', function(req, res){
    console.log(req);
    req.logout();
    res.redirect('/');
});

app.get('/login',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
        console.log(res);
    });

app.get('/login/facebook',
    passport.authenticate('facebook'));

app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        res.render('profile', { user: req.user });
    });

app.listen(3000, function(req, res){
    console.log("We are listening on port 3000!");

});