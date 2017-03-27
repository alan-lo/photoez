const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.render('posts/post', {title: 'PhotoEz'});
  } else {
    // not logged in
    res.redirect('/');
  }

});

module.exports = router;
