const express = require('express');
const {User, Album, Post} = require('../models/index');

const router = express.Router();

let setup=false;

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next){
  if (req.user){
    console.log('image uploading');
  } else{
    res.redirect('/');
  }

});

router.post('/new', function(req, res, next){
  if (req.user){
      console.log('has user');
      if (!setup){
        console.log('hello world');
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
          if (albums){
            setup=true;
            res.send({success:true, init:true,  redirect: false, albums});
          }else{
            res.send({success:false, msg: 'No albums'});
          }
        });
      }else{
        setup=false;
        res.send({success:true, init:false,  redirect: false});
      }
    }else{
      res.redirect('/');
    }
});


module.exports = router;
