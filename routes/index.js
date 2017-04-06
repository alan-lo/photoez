const express = require('express');
const User = require('../models/comment');

const router = express.Router();

/* GET home page / login page */
router.get('/', function(req, res, next) {
  if (req.user){
    console.log('redirect to posts');
    res.redirect('/posts/?page=1');
  }else{
    console.log('render index page');
    res.render('index', {body:{}, errors: {}});
  }
});

module.exports = router;
