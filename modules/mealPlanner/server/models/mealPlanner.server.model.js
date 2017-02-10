//schema for calendar event objects
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
var MealPlannerEventSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  // _id: {
  //   type: Number,
  //   required: 'Recipe must have a correlative id'
  // },
  startsAt: {
    type: Date,
    required: 'Needs A start date'
  },
  endsAt: {
    type: String,
    required: 'Needs and end'
  },
  color: {
    type: Object
  },
  draggable: {
    type: Boolean,
    default: true
  },
  duration: {
    type: String,
  },
  recipeId: {
    type: Number,
    required: 'Recipe Id Needed'
  },
  completed: {
    type: String,
    default: 'No'
  },
  title: {
    type: String
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('MealPlannerEvent', MealPlannerEventSchema);
