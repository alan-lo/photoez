const express = require('express');
const router = express.Router();
const {User} = require('../models/index');
const bcrypt = require('bcryptjs');
/* GET users listing. */

const loginRoutes = function(passport){
  function loggedIn(req, res, next){
    if (req.user){
      next();
    }else{
     res.redirect('/');
    }
  }

  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.get('/auth/google',
  passport.authenticate('google',
    { scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'] 
  }));

  router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/posts/?page=1');
  });

  router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/posts/?page=1',
    failureRedirect: '/'
  }));

  router.get('/sign-in', function(req, res, next) {
    res.render('index', {body:{}, errors:{}});
  });

  router.post('/sign-in', passport.authenticate('local', {
    successRedirect: '/posts/?page=1',
    failureRedirect: '/',
    failureFlash: true,
  }))


  router.get('/register', function(req, res, next) {
      res.render('index', {body:{}, errors:{}});
  });

  router.post('/register', function(req, res, next) {
      const {
          firstname,
          lastname,
          username,
          email,
          password,
          password2
      } = req.body

      //validations
      req.checkBody('firstname', 'First name is required').notEmpty();
      req.checkBody('lastname', 'Last name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Email is not valid').isEmail();
      req.checkBody('username', 'Username is required').notEmpty();
      req.checkBody('password', 'Password is required').notEmpty();

      req.getValidationResult().then(function(result) {
        if (!result.isEmpty()){
           res.render('index' , {body: req.body, errors: result.mapped()})
        }else{

          User.findOne({
              where: {
                  userName: username
              }
          }).then(function(user) {
              if (!user) {
                  User.create({
                      userName: username,
                      password: bcrypt.hashSync(password),
                      email: email,
                      firstName: firstname,
                      lastName: lastname
                  }).then(function(user) {
                    if (passport){
                      console.log(user);
                      }

                      passport.authenticate("local", {
                          failureRedirect: "/users/sign-in",
                          successRedirect: "/posts/?page=1"
                      })(req, res, next)
                  })
              } else {
                  console.log("user exists");
                  res.render('index', {errors: 'user exists'})

              }
          })
        }
      });
  });

  router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect("/");
  });

  router.get('/:id', loggedIn,function(req,res,next){
    User.findOne({
        where: {
            id: req.user.id
          }
    }).then((user)=>{
      if (user){
        res.render('profile/profile', {user: user} );
      }else{
        res.redirect('/dashboard');
      }
    })
  })
  return router;
}

module.exports = loginRoutes;
