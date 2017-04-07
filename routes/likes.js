const express = require('express');
const router = express.Router();
const {User, Post, Album, Like} = require('../models/index');

let pageLimit = 9;

router.get('/', function(req, res, next){
  if (req.user){
    Like.findAndCountAll({
    include: [
      {
        model: Post,
        include: [
          {
          model: User
          }
        ]
      }
    ],
    where:{
      UserId: req.user.id
    },
    limit: pageLimit,
    offset: (req.query.page - 1) * pageLimit
    }).then((likes) => {
      if (likes){
        let numPages = Math.ceil(likes.count / likes.rows.length);
        if (likes.rows.length < pageLimit){
          numPages = req.query.page;
        }
        res.render('likes/likes', {likes: likes.rows, currentPage: parseInt(req.query.page), pages: numPages, user: req.user})
      }
    })
  }else{
    res.redirect('/');
  }
});

router.post('/:id', function(req, res, next) {
  const {link, postId}= req.body;
  if (req.user) {
    Post.findById( postId ,{
      include: [
        {
          model: User
        },
        {
          model: Like
        }
      ],
      where: {
        imageURL: link
      }
    }).then((post) => {
      if (post){
        Like.create({UserId: req.user.id , PostId: post.id})
            .then((like)=>{
            if (like){
              Like.findAndCountAll({
                where:{
                  PostId : like.PostId
                }
              }).then((likes)=>{
                res.send({success: true, likes: likes.count});
              });
            }
        });
      }
    });
  } else {
    res.redirect('/');
  }
});

router.delete('/:id', function(req, res, next) {
  const {link, postId}= req.body;
  if (req.user) {
    Post.findById( postId ,{
      include: [
        {
          model: User
        },
        {
          model: Like
        }
      ],
      where: {
        imageURL: link
      }
    }).then((post) => {
      if (post){
        Like.findOne({
          where:{
            UserId: req.user.id,
            PostId: post.id
          }
        }).then((like) => {
          if (like){
            like.destroy()
                .then((rowdeleted) => {
              console.log(rowdeleted);
              console.log('post id: '+ postId)
              Like.findAndCountAll({
                where:{
                  PostId : postId
                }
              }).then((likes)=>{
                console.log(likes);
                console.log('current count: '+likes.count);
                  res.send({success: true, likes: likes.count});
              });
            });
          }
        })
      }
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
