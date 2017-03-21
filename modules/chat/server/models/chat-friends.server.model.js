// 'use strict';
//
// /**
//  * Module dependencies
//  */
// var mongoose = require('mongoose'),
//   Schema = mongoose.Schema;
//
// /**
//  * Article Schema
//  */
//  // modify an images section to store a list of images,
// var ChatFriendsSchema = new Schema({
//   created: {
//     type: Date,
//     default: Date.now
//   },
//   friends: [{
//     type: Schema.ObjectId,
//     ref: 'User',
//     // trim: true,
//     // required: 'Title cannot be blank'
//   }],
//   doctors: [{
//     type: Schema.ObjectId,
//     ref: 'healthManager'
//   }],
//   pending: [{
//     user : Schema.ObjectId,
//     message: String
//   },
// ],
//   user: {
//     type: Schema.ObjectId,
//     ref: 'User'
//   }
// });
//
// mongoose.model('ChatFriends', ChatFriendsSchema);
