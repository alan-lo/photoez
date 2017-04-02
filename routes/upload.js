const express = require('express');
const {User, Album, Post} = require('../models/index');
const path = require('path');
const router = express.Router();
const UPLOAD_PATH = './public/images/upload';
const multer = require('multer');
const Datauri = require('datauri');
const dUri = new Datauri();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
let setup=false;

const uploadRoutes = function(cloudinary){

  router.get('/', function(req, res, next) {
    res.redirect('/');
  });

  router.post('/' , upload.single('filename'), function(req, res, next){
    if (req.user){
      dUri.format(path.extname(req.file.originalname).toString(),req.file.buffer);
      cloudinary.uploader.upload(dUri.content, function (result) {
      if (result) {
        Album.findOne({
          where: {
            UserId: req.user.id,
            name: req.body.albumList
          }
        }).then((album) => {
          if (album) {
            Post.create({imageURL: result.url, UserId: req.user.id ,AlbumId: album.id})
                .then((post) => {
                  res.redirect('/posts/?page=1');
                }).error((err) => {
                  console.log(err);
                  res.redirect('/posts/?page=1');
                })
          } else {
            console.log('Cannot find album');
            res.redirect('/posts/?page=1');
          }
        })
      } else {
        console.log('fail to upload');
        res.redirect('/posts/?page=1');
      }
    });

    } else{
      res.redirect('/');
    }
});

  router.post('/new', function(req, res, next){
    if (req.user){
        if (!setup){
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
  return router;
}

module.exports = uploadRoutes;
