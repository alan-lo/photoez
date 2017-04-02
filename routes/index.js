const express = require('express');
const User = require('../models/comment');

const router = express.Router();

/* GET home page / login page */
router.get('/', function(req, res, next) {
  if (req.user){
    res.redirect('/posts/?page=1');
  }else{
    res.render('index', {body:{}, errors: {}});
  }
});

module.exports = router;
