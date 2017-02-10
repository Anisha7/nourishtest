'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  // recipe = mongoose.model('Recipe'),
  // TestArticle = mongoose.model('TestArticle'),
  MealPlannerEvent = mongoose.model('MealPlannerEvent'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

  //right now, am just going to have to use the unirest spoonacular calls
  //doing a complex search would not be possible with mongodb?
  // maybe possible to search a list within an object, not sure the time constraints


exports.createEvent = function (req, res){
  // console.log(req.body);
  var mealPlannerEvent = new MealPlannerEvent(req.body);
  console.log(mealPlannerEvent);
  mealPlannerEvent.user = req.user;
  mealPlannerEvent.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(mealPlannerEvent);
    }
  });
}
exports.editEvent = function (req, res){

}
exports.deleteEvent = function (req, res){

}
//gets upcoming events based on calendar views
//before sending events, changes them to completed
exports.getEvents= function (req, res){
  MealPlannerEvent.find({user: req.user}).sort('-created').populate('user', 'displayName').exec(function (err, events) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // console.log(recipes);

      res.json(events);
    }
  });
}
// // mongoose.connect("mongodb://localhost:27017/mean-dev/TestArticles");
// /**
//  * Create an article
//  */
// exports.create = function (req, res) {
//   console.log(req.body);
//   var article = new Article(req.body);
//   article.user = req.user;
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
// /**
//  * Create a test article
//  */
// exports.testCreate = function (req, res) {
//   console.log(req.body);
//   var testarticle= new TestArticle(req.body);
//   // console.log(sick);
//   // console.log(req.body.params[0]);
//   // var testArticle = new testArticle(req.body);
//   testarticle.user = req.user;
//   //look at users.profile.server.controller for how to upload images
//   testarticle.images.push(req.body.imgs);
//   console.log(testarticle);
//   //
//   // testArticle.save(function (err) {
//   //   if (err) {
//   //     return res.status(422).send({
//   //       message: errorHandler.getErrorMessage(err)
//   //     });
//   //   } else {
//   //     res.json(testArticle);
//   //   }
//   // });
// };
//
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
//   res.json(article);
// };
//
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
//
// /**
//  * Article middleware
//  */
// exports.articleByID = function (req, res, next, id) {
//
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
