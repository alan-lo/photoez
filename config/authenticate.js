const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require('bcryptjs');
const {User} = require('../models/index');
const authConfig = require('./passport-auth-config');

module.exports = function(passport){
  passport.use(new LocalStrategy(
    {passReqToCallback:true,
      usernameField: 'username',
      passwordField: 'password',
    },
    function(req, username, password, done) {
      User.find({where: {userName: username} })
          .then(function(user, err) {
            if (err) {
              return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect Username'});
            }
            if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false, { message: 'Incorrent Password'});
            }
            return done(null, user);
          });
  }));

  passport.use(new FacebookStrategy({
    clientID: authConfig.facebook.clientID,
    clientSecret: authConfig.facebook.clientSecret,
    callbackURL: "http://localhost:3000/users/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(
        {
           where: {profileId: profile.id},
           defaults: {
             firstName: profile.name.givenName,
             lastName: profile.name.familyName,
             email: profile.emails[0].value,
             password: 'default',
             userName: profile.emails[0].value,
             provider: profile.provider
           }
        }
      ).spread((user, created) => {
        done(null, user);
      }).catch((err) =>{
        return done(err);
      });
  }
));

  passport.use(new GoogleStrategy({
    clientID: authConfig.google.clientID,
    clientSecret: authConfig.google.clientSecret,
    callbackURL: "http://localhost:3000/users/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate(
        {
           where: {profileId: profile.id},
           defaults: {
             firstName: profile.name.givenName,
             lastName: profile.name.familyName,
             email: profile.emails[0].value,
             password: 'default',
             userName: profile.emails[0].value,
             provider: profile.provider
           }
        }
      ).spread((user, created) => {
        done(null, user);
      }).catch((err) =>{
        return done(err);
      });
  }
));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id).then(function (user) {
      cb(null, user);
    });
  });
}
