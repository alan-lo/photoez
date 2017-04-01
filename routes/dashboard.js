const express = require('express');
const User = require('../models/index');

const router = express.Router();

router.get('/', function(req, res, next) {
  if (req.user) {
    res.render('dashboard/dashboard', {user: req.user});
  } else {
    res.redirect('/');
  }
});


module.exports = router;
