const express = require('express');
const router = express.Router();
const {User, Album, Post} = require('../models/index');

router.get('/', function(req, res, next) {
  Album.findAll({
    include: [
      {
        model: User,
        where: {
          id: req.user.id
        }
      }
    ],
    order: [
      ['name', 'ASC']
    ]
  }).then((albums) => {
      res.render('albums/albums', {albums, user: req.user})
  });
});

router.get('/api/albums', function(req, res, next) {
  Album.findAll({
    include: [
      {
        model: User,
        where: {
          id: req.user.id
        }
      }
    ],
    order: [
      ['name', 'ASC']
    ]
  }).then((albums) => {
    res.send(albums);
  });
});




router.post('/create', function(req, res, next) {
  const {name} = req.body
  Album.findOne({
    where: {
      UserId: req.user.id,
      name: name
    }
  }).then((album) => {
    if (album) {
      res.send({success: false, redirect: false, msg: "Album exist"});
    } else {
      Album.create({UserId: req.user.id, name: name}).then((album) => {
      res.send({success: true, redirect: true, redirectURL: "/albums"});
      }).error((err) => {
      console.log(err);
      })
    }
  })
})

router.post('/delete', function(req, res, next) {
  const {name} = req.body
  Album.findOne({
    where: {
      UserId: req.user.id,
      name: name
    }
  }).then((album) => {
    if (album) {
      album.destroy();
      res.send({success: true, redirect: true, redirectURL: "/albums"});
    } else {
      res.send({success: false, redirect: false, msg: "Album not found"});
    }
  })
})

router.get('/:id', function(req, res, next) {
  Album.findById( req.params.id ,
    {
      include: [
      {
        model: User
      }, {
        model: Post,
        where: {
          UserId: req.user.id
        }
      }
    ],
    where:{
      UserId: req.user.id
    }
    ,
    order: [
      ['name', 'ASC']
    ]
  }).then((album) => {
     res.render('albums/show.ejs', {album: album, posts:album.Posts, user: album.User})
  });
});

module.exports = router;
