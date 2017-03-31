const express = require('express');
const router = express.Router();
const {User,Album, Post} = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.user) {
    console.log(req.user.id);
    console.log(req.user.userName);
    console.log(req.user.email);
    console.log(req.user.firstName);
    console.log(req.user.lastName);


    // Post.findAll({
    //   include: [{
    //     model: Album,
    //     where: {id: 1}
    //   }]
    // }).then( (albums) =>{
    //
    //   console.log(albums[0].name);
    //   res.send(albums)})

    // Album.findAll({
    //   include: [{
    //     model: User,
    //     where: { id: req.user.id }
    //   }]
    // }).then( (albums) =>{
    //
    //   console.log(albums[0].name);
    //   res.send(albums)})



    // res.render('albums/albums', {title: 'PhotoEz'});
  } else {
    // not logged in
    res.redirect('/');
  }

});

module.exports = router;
