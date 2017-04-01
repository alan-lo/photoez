const express = require('express');
const User = require('../models/index');

const router = express.Router();

router.get('/', function(req, res, next) {
  if (req.user) {
    console.log(req.user.id);
    console.log(req.user.userName);
    console.log(req.user.email);
    console.log(req.user.firstName);
    console.log(req.user.lastName);


    res.render('dashboard/dashboard', {user: req.user});
  } else {
    // not logged in
    res.redirect('/');
  }

});


module.exports = router;
