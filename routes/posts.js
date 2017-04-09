const express = require('express');
const router = express.Router();
const {User, Post, Like, Comment} = require('../models/index');

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
        },{
          model: Comment,
          include: [
            {
              model: User
            }
          ]
        }
      ]
    }).then((post) => {
      if (post){
        post.update({
          viewCount: post.viewCount + 1
        }).then(function(){

        post.getComments({
          include: [
            {
              model: User
            }
          ] ,
          order: [['id', 'DESC']]
        }).then((comments) => {
              if (comments){
                console.log(comments);
              }
              res.render('posts/post', {post: post, comments: comments} );
            });

          // res.render('posts/post', {post: post} );
        });

      }
    });
  } else {
    res.redirect('/');
  }
});

router.post('/:id/comment', function(req, res, next) {
  if (req.user) {
    Post.findById(req.params.id)
        .then((post) => {
          console.log(post);
          if (post){
            Comment.create({body: req.body.comment,
                            UserId: req.user.id,
                            PostId:req.params.id
                          }).then((comment) => {
                            if (comment){
                              console.log(comment);
                            }
                            res.send({success:true, comment: comment, firstName: req.user.firstName});
                          })
        }
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
