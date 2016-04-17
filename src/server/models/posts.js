/**
 * Created by rachelkoldenhoven on 4/17/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  comments: [{
    user: String,
    comment: String
  }]
  ,
  image: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  }
});

var Post = mongoose.model('post', PostSchema);


module.exports = Post;

