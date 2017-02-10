'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Quote = mongoose.model('Quote'),

  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// mongoose.connect("mongodb://localhost:27017/mean-dev/TestArticles");
/**
 * Create an article
 */
exports.addQuote = function (req, res) {
  console.log(req.body);
  var quote = new Quote(req.body);
  quote.user = req.user;

  quote.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(quote);
    }
  });
};

exports.listQuotes = function (req,res){
    //just get a random record for each load
    //db.yourCollection.find().limit(-1).skip(yourRandomNumber).next()
}



/**
 * Update an article
 */
// exports.update = function (req, res) {
//   var article = req.article;
//
//   article.title = req.body.title;
//   article.content = req.body.content;
//
//   article.save(function (err) {
//     if (err) {
//       return res.status(422).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.json(article);
//     }
//   });
// };
//
//
// /**
//  * List of Articles
//  */
// exports.list = function (req, res) {
//   // console.log(req.user);
//   if (!req.query.displayName){  //edit this eventually
//
//     Article.find().sort('-created').populate('user', 'displayName').exec(function (err, articles) {
//       if (err) {
//         return res.status(422).send({
//           message: errorHandler.getErrorMessage(err)
//         });
//       } else {
//         res.json(articles);
//       }
//     });
//   }
//   else{
//     Article.find({user:req.user}).sort('-created').populate('user', 'displayName').exec(function (err, articles) {
//       if (err) {
//         return res.status(422).send({
//           message: errorHandler.getErrorMessage(err)
//         });
//       } else {
//         res.json(articles);
//       }
//     });
//   }
// };
