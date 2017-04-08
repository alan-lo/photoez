const express = require('express');
const router = express.Router();
const {User, Post, Like} = require('../models/index');

let pageLimit = 9;

router.get('/', function(req, res, next) {
  if (req.user) {
    Post.findAndCountAll({
      include: [
        {
          model: User
        },
        {
          model: Like
        }
      ]
      ,
      order: [['id', 'ASC']],
      limit: pageLimit,
      offset: (req.query.page - 1) * pageLimit
    }).then((posts) => {
        let numPages = Math.ceil(posts.count / posts.rows.length);
        if (posts.rows.length < pageLimit){
          numPages = req.query.page;
        }
        res.render('posts/posts', {posts: posts.rows, currentPage: parseInt(req.query.page), pages:numPages, user: req.user})
    });
  } else {
    res.redirect('/');
  }
});

router.get('/:id', function(req, res, next) {
  if (req.user) {
    Post.findById(req.params.id ,{
      include: [
        {
          model: User
        },
        {
          model: Like
        }
      ]
    }).then((post) => {
      console.log(post);
      if (post){
        res.render('posts/post', {post: post} );
      }
    });
  } else {
    res.redirect('/');
  }
});


module.exports = router;
