const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const {User} = require('../models/index');

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

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id).then(function (user) {
      cb(null, user);
    });
  });
}
