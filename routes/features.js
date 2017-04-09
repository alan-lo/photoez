const express = require('express');
const {User, Post, Album, Like, Comment} = require('../models/index');
const router = express.Router();

router.get('/', function(req, res, next) {
  console.log('hello world');
  if (req.user){
    Post.findAll({
      include:[
        {
        model: Like
        },
        {
        model: User
        },
        {
        model: Comment
        }
      ],
      order: [['viewCount','DESC']]
      }).then((posts) => {
        posts.sort((a,b)=>{
          return b.Likes.length - a.Likes.length;
        })
        let topNine = posts.slice(0,9);
        res.render('features/features', {posts: topNine, user: req.user});
      })

  }else{
    res.redirect('/');
  }
});

module.exports = router;
