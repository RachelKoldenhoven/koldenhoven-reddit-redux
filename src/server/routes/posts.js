/**
 * Created by rachelkoldenhoven on 4/17/16.
 */
var express = require('express');
var router = express.Router();
var Post = require('../models/posts');

var seed = require('../models/seeds/test-seed');

// GET ALL posts
router.get('/', function (req, res, next) {



  Post.find({})
    .then(function(posts) {
      console.log("posts: ", posts);
      res.status(200).json({
        status: 'success',
        data: posts
      });
    })
    .catch(function (err) {
      return next(err);
    });
});

// GET single post
router.get('/:id', function (req, res, next) {
  Post.findById(req.params.id)
    .then(function (post) {
      res.status(200).json({
        status:'success',
        data: post
      });
    })
    .catch(function (err) {
      return next(err);
    });
});

// add post
router.post('/', function (req, res, next) {
  var post = new Post(req.body);
  post.save()
    .then(function (post) {
      res.status(200).json({
        status: 'success',
        data: post
      });
    })
    .catch(function (err) {
      return next(err);
    });
});

// update post
router.put('/:id', function (req, res, next) {
  var post_id = req.params.id;
  var option = req.body;
  Post.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(function (post) {
      res.status(200).json({
        status: 'success',
        data: post
      });
    })
    .catch(function (err) {
      return next(err);
    });
});

// remove post
router.delete('/:id', function (req, res, next) {
  Post.findByIdAndRemove(req.params.id)
    .then(function (post) {
      res.status(200).json({
        status: 'success',
        data: post
      });
    })
    .catch(function (err) {
      return next(err);
    });
});


module.exports = router;