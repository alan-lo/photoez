const express = require('express');
const router = express.Router();
const {User, Album, Post} = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.user.id);
    console.log(req.user.userName);
    console.log(req.user.email);
    console.log(req.user.firstName);
    console.log(req.user.lastName);
    Album.findAll({
            include: [
                {
                    model: User,
                    where: {
                        id: req.user.id
                    }
                }
            ],
            order: [['name', 'ASC']]
        }).then((albums) => {
            res.render('albums/albums', {albums, user: req.user})
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
                res.send({success: false, redirect:false, msg: "Album exist"});
            } else {
                console.log('album not found');
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
                res.send({success: false, redirect:false, msg: "Album not found"});
            }
    })
})

module.exports = router;
