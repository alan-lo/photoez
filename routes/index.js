const express = require('express');
const User = require('../models/comment');

const router = express.Router();

/* GET home page / login page */
router.get('/', function(req, res, next) {
  if (req.user){
    res.redirect('/features');
  }else{
    res.render('index', { title: 'PhotoEz', body:{}, errors: {}});
  }
});

module.exports = router;
