'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  
var UserPublicSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: ''
    // validate: [validateLocalStrategyProperty, 'Please fill in your first name']
  },
  lastName: {
    type: String,
    trim: true,
    default: ''
    // validate: [validateLocalStrategyProperty, 'Please fill in your last name']
  },
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String
    // index: {
    //   unique: true,
    //   sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    // },
    // lowercase: true,
    // trim: true,
    // default: '',
    // validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  username: {
    type: String,
    unique: 'Username already exists',
    lowercase: true,
    trim: true
  },
  profileImageURL: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  created: {
    type: Date,
    default: Date.now
  },
  photos: [{
    type: String
  }]
});

mongoose.model('UserPublic', UserPublicSchema);
