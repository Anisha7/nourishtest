var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
 // modify an images section to store a list of images,
var urlSchema = new Schema({
  created: {
    type: Date,
    default: Date.Now
  },
  url: {
    type: String,
    required: 'Must have url'
  },
  title: {
    type: String,
    required: 'Must have title'
  },
  tags: {
    type: String,
    required: 'Must have tags'
  },
  description: {
    type: String,
    required: 'Must have a description'
  },
  user: {
    type:Schema.ObjectId,
    ref: 'User'
  },
  // content: String

});

mongoose.model('UrlStorage', urlSchema);
