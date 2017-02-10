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
var RecipeTempSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  id: {
    type: Number,
    default: '',
    trim: true
  },
  image: {
    type: String
  },
  calories: {
    type: Number
  },
  protein: {
    type: String
  },
  carbs: {
    type: String
  },
  fat: {
    type: String
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('RecipeTemp', RecipeTempSchema);
