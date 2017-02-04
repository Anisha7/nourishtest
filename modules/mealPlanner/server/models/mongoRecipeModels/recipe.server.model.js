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
var RecipeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  _id: {
    type: Number,
    required: 'Recipe must have a correlative id'
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  imgPath: {
    type: String
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Recipe', RecipeSchema);
