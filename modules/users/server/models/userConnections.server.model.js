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
var UserConnectionsSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  friends: [{
    type: Schema.ObjectId,
    ref: 'UserPublic'
    // trim: true,
    // required: 'Title cannot be blank'
  }],
  doctors: [{
    type: Schema.ObjectId,
    ref: 'healthManager'
  }],
  pending: [{
      user: {
        type: Schema.ObjectId,
        ref: 'UserPublic'
      },
      message: {
        type: String
      }
  }],
  username: {
    type: String
  },
  displayName: {
    type: String
  },
  attachments: {
    type: String
  },
  email: {
    type: String
  }
});

mongoose.model('UserConnections', UserConnectionsSchema);
