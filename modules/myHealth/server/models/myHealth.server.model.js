'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Health Schema
 */
var HealthSchema = new Schema({
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
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('MyHealth', HealthSchema);
