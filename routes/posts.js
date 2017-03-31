const express = require('express');
const router = express.Router();
const {User, Post} = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.user) {
    console.log(req.user.id);
    console.log(req.user.userName);
    console.log(req.user.email);
    console.log(req.user.firstName);
    console.log(req.user.lastName);


    res.render('posts/post');
  } else {
    // not logged in
    res.redirect('/');
  }

});

module.exports = router;
