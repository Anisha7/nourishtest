'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
 // modify an images section to store a list of images,
 //modify model set up for more efficient searching
var testArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  }
  ,
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  tags: {
    type: String,
    default: '',
    trim:true
  },
  layout: {
    type: String,
    default: '',
    trim: true
  },
  imgs: [{
    type: String

  }],
  comments: [{
    id: String,
    text: String,
    PostedBy: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    created: {
      type: Date,
      default: Date.now
    }
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

testArticleSchema.methods.testArticleConstructor= function (fields, user){
  this.title=fields.title;
  this.tags=fields.tags;
  // this.layout=fields.layout;
  this.content=fields.content;
  // this.imgs.push(imgs);
  this.user= user;
  return;
  //create a preview that includes the beginning content and preview image
}

testArticleSchema.methods.getArticleImages= function(articleTitle){

}
testArticleSchema.methods.getArticlePreview = function(articles){

}
// var testArticleSchema = new Schema({
//   created: {
//     type: Date,
//     default: Date.now
//   },
//   title: {
//     type: String,
//     default: '',
//     trim: true,
//     required: 'Title cannot be blank'
//   },
//   content: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   user: {
//     type: Schema.ObjectId,
//     ref: 'User'
//   }
// });

mongoose.model('TestArticle', testArticleSchema);
