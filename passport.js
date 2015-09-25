"use strict"
var _ = require('lodash');
var passport = require('koa-passport');
var LocalStrategy = require('passport-local').Strategy;

var secret = require('./secret');
var User = require('./models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * Sign in using Username and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'username' }, function(username, password, done) {
  username = username.toLowerCase();
  User.findOne({ username: username }, function(err, user) {
    if (!user) return done(null, false, { message: 'Username ' + username + ' not found'});
    if( user.comparePassword(password) ){
      return done(null, user)
    }else{
      return done(null, false, { message: 'Invalid usernmae or password.' });
    }
  });
}));

module.exports = passport