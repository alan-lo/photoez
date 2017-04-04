const express = require('express');
const router = express.Router();
const {User, Post, Album, Like} = require('../models/index');



router.get('/', function(req, res, next){
  if (req.user){
    Like.findAll({
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
    }
    }).then((likes) => {
      if (likes){
        res.render('likes/likes', {likes: likes, user: req.user})
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
