'use strict';

/**
 * Module dependencies
 */
var quotes = require('../controllers/quotes.server.controller'); //create multiple controllers to clean this stuff up
  // multiparty = require('connect-multiparty'), // maybe can delete the multiparty
  // multipartyMiddleware = multiparty();

module.exports = function (app) {
  // quotes collection routes

  app.route('/api/quotes')
    // .get(quotes.getQuotes)
    // .put(quotes.editQuotes)
    .post(quotes.addQuote);

};
