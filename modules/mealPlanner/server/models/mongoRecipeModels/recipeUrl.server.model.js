//schema for recipe objects
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
var RecipeUrlSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  // _id: {
  //   type: Number,
  //   required: 'Recipe must have a correlative id'
  // },
  url:{
    type: String,
    required: 'Must have url'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('RecipeUrl', RecipeUrlSchema);
