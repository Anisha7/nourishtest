'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  TestArticle = mongoose.model('TestArticle'),
  UrlStorage = mongoose.model('UrlStorage'),
  // ArticleComment= mongoose.model('ArticleComment'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  fs = require('fs'),
  _ = require('lodash'),
  multiparty= require('multiparty'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Gets User's list of friend connections
*/
exports.getConnections = function (req, res){

}
/**
* Gets chat history by date, as user scrolls up through chat it will load more from history's previously loaded date
*/
exports.getChatHistory = function (req, res){

}
/**
* Searches through messages for key phrase
*/
exports.searchMessages = function (req, res){
  
}
// exports.addTestArticleComment= function(req, res){
//   var article = req.article;
//
//   article.comments.push(req.comments);
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
// }
// exports.editArticle = function(req,res){
//    //use fs unlink to remove files
// }
// /**
//  * Show the current article
//  */
// exports.read = function (req, res) {
//   // convert mongoose document to JSON
//   var article = req.article ? req.article.toJSON() : {};
//
//   // Add a custom field to the Article, for determining if the current User is the "owner".
//   // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
//   article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());
//
//   // console.log('HELLOW');
//   // console.log(article);
//   res.json(article);
// };
//
// exports.testRead = function(req, res){
//
//   var article = req.article ? req.article.toJSON() : {};
//   // console.log('in test read');
//   // console.log(article);
//   // Add a custom field to the Article, for determining if the current User is the "owner".
//   // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
//   article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());
//
//   res.json(article);
// }
// /**
//  * Update an article
//  */
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
// /**
//  * Delete an article
//  */
// exports.delete = function (req, res) {
//   var article = req.article;
//
//   article.remove(function (err) {
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
// exports.testList = function(req, res){
//   TestArticle.find().sort('-created').populate('user', 'displayName').exec(function (err, articles) {
//     if (err) {
//       return res.status(422).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.json(articles);
//     }
//   });
// }
// exports.testSearch = function(req, res){ //parse the test article data base for articles matching search values
//   // console.log(req);
//   console.log('in search');
//   // console.log(req.query);
//   var regex = ".*"+req.query.searchValue+".*";
//   console.log(regex);
//   TestArticle.find({$or: [{"title":{$regex:regex, $options: '-i'} },{"tags": {$regex: regex, $options: '-i'} }]}).sort('created').populate('user','displayName').exec(function(err,articles){
//       if(err){
//         console.log(err);
//         res.status(200);
//       }
//       else{
//         console.log(articles);
//         res.json(articles);
//       }
//   });
// }
// /**
//  * Article middleware
//  */
// exports.articleByID = function (req, res, next, id) {
//
//   // console.log('made it to articleBy ID');
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).send({
//       message: 'Article is invalid'
//     });
//   }
//
//   Article.findById(id).populate('user', 'displayName').exec(function (err, article) {
//     if (err) {
//       return next(err);
//     } else if (!article) {
//       return res.status(404).send({
//         message: 'No article with that identifier has been found'
//       });
//     }
//     req.article = article;
//     next();
//   });
// };
//
// /**
//  * Test Article middleware
//  */
// exports.testArticleByID = function (req, res, next, id) {
//   // console.log('testArticlebyida');
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).send({
//       message: 'Article is invalid'
//     });
//   }
//
//   TestArticle.findById(id).populate('user', 'displayName').exec(function (err, article) {
//     if (err) {
//       return next(err);
//     } else if (!article) {
//       return res.status(404).send({
//         message: 'No article with that identifier has been found'
//       });
//     }
//     req.article = article;
//     next();
//   });
// };
//
// /**
//   *Url Management Methods
//   */
//
// exports.addUrl = function(req,res){
//   console.log(req.body);
//   var urlStorage= new UrlStorage(req.body);
//   urlStorage.user = req.user;
//   console.log(urlStorage.url);
//   urlStorage.save(function (err) {
//     if (err) {
//       return res.status(422).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.json(urlStorage);
//     }
//   });
//
// }
//
// exports.listUrls = function(req,res){
//   // console.log('in list');
//   UrlStorage.find().sort('-created').populate('user', 'displayName').exec(function (err, urls) {
//     if (err) {
//       return res.status(422).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.json(urls);
//     }
//   });
}
