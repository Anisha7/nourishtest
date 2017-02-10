'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  // recipe = mongoose.model('Recipe'),
  // TestArticle = mongoose.model('TestArticle'),
  // ar _ = require('lodash');
  // var jwt = require('jsonwebtoken');
  // var bcrypt = require('bcryptjs');
  RecipeUrl = mongoose.model('RecipeUrl'),
  RecipeTemp = mongoose.model('RecipeTemp'),
  fs = require('fs'),
  XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
  cheerio = require('cheerio'),
  request = require('request'),
  Q = require('q'),
  mongo = require('mongoskin'),
  db = mongo.db("mongodb://localhost:27017/mean-stack-registration-login-example", { native_parser: true }),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

  db.bind('testrecipes');


  //right now, am just going to have to use the unirest spoonacular calls
  //doing a complex search would not be possible with mongodb?
  // maybe possible to search a list within an object, not sure the time constraints

  function getTestRecipes(){
    var deferred=Q.defer();
    // console.log('In getTest');
    db.testrecipes.find({}).toArray(function(err,docs){
      if (err) deferred.reject(err.name + ': ' + err.message);
      if(docs) {
        // console.log('founddocs');
        // console.log(docs);
        // console.log(docs);
        // console.log(docs);
        deferred.resolve(docs);
      }
      else{
        deferred.resolve();
      }
    });
    return deferred.promise;
  }
exports.listRecipes= function(req, res){
  //just list a bunch of recipes walawala
  //might need to call the get ratings here
  RecipeTemp.find().sort('-created').populate('user', 'displayName').exec(function (err, recipes) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // console.log(recipes);
      res.json(recipes);
    }
  });
  // getTestRecipes().then(function(obj){
  //   // console.log(json(obj.results));
  //   // console.log(obj[0].results);
  //   // for (var x=0; x<obj[0].results.length;x++){
  //   //   // console.log(obj[0].results[x]);
  //   //   var recipeTemp = new RecipeTemp(obj[0].results[x]);
  //   //   // console.log(recipeTemp);
  //   //   recipeTemp.save(function (err) {
  //   //     if (err) {
  //   //       return res.status(422).send({
  //   //         message: errorHandler.getErrorMessage(err)
  //   //       });
  //   //     } else {
  //   //       console.log(recipeTemp);
  //   //     }
  //   //   });
  //   // }
  //   res.json(obj);
  //   // status(200).
  // })
  // .catch(function(err){
  //   res.status(404);
  // })
}

exports.getRecipeByID= function (req,res){
  //For getting info to display on the browse screen
  //use unirest in conjunction with acquiring the recipe rating and comments
  return;
}
exports.addRecipeUrl = function(req,res){

  var recipeUrl = new RecipeUrl();
  recipeUrl.url = req.body.Url;
  recipeUrl.user = req.user;
  console.log(recipeUrl.user);
  recipeUrl.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(recipeUrl);
    }
  });
};

exports.listRecipeUrl = function(req, res){
  RecipeUrl.find().sort('-created').populate('user', 'displayName').exec(function (err, urls) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(urls);
    }
  });
}

exports.addRecipe= function(req,res){
  //for now add to nourish custom database
  console.log(req.body);

  res.json('success');
}

//////////////// AddRecipeByURLFUNCTIONS
function downloadImage(IMGUrl){ //returns new img path

}
function extractUrlRecipeInfo(url, websiteName){ //returns a recipe object i guess
  //
}
/////////////////

exports.editRecipe= function(req,res){
  //create a database of recipe ratings and ids
  return;

}

exports.deleteRecipe= function(req,res){
  return;
}
exports.complexSearchRecipes= function(req,res){
  return;
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
