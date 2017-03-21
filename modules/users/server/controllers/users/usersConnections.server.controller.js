'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  UsersConnections = mongoose.model('UserConnections'),
  userPublic = mongoose.model('UserPublic'),
  // TestArticle = mongoose.model('TestArticle'),
  Users = mongoose.model('User'),
  // ArticleComment= mongoose.model('ArticleComment'),
  multer = require('multer'),
  fs = require('fs'),
  _ = require('lodash'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
* Search User list for User
*/
exports.searchUser = function (req, res){ //search user database for username or display name or regular name
  var searchValue = req.query;
  var regex = ".*"+req.query.SearchValue+".*";
  console.log(searchValue);
  // console.log('function');
  // Users.find({$or: [{"displayName":{$regex:regex, $options: '-i'} },{"tags": {$regex: regex, $options: '-i'} }]}).sort('created').populate('user','displayName').exec(function(err,articles){
  Users.find({$or:[{"displayName":{$regex:regex, $options: '-i'}},{"username":{$regex:regex, $options: '-i'}}]}).populate('user', 'displayName').exec(function(err, users){
    if (err){
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    else{
      console.log(users.length);
      var userList = [];
      for (var x = 0;  x < users.length; x++){
        var user = {};
        user.displayName = users[x].displayName;
        user.username = users[x].username;
        user.profileImageURL = users[x].profileImageURL;
        //eventually include all other relevant information
        userList.push(user);
      }
      res.json(userList);
      // parse through list of results, only returning usernames and displaynames and profpic urls
    }
  })
  return res.status(200);
}
exports.addUser = function (req, res){
  //if no users connection object, create one for the user, then add requested user to the list
  Users.find({}).exec(function(err,users){ //also initialize public profile object on sign up
    for (var x = 0; x < users.length; x++){

    }
  })
}
exports.removeUser = function (req, res){

}
exports.pendingRequests = function(req, res){

}
exports.sendOrRespondToRequest = function(req, res){
  console.log(req.body[1]);
  if (req.body[1] == 'request'){
    UserConnections.find({'username': req.user.username}).exec(function(err, data){
      if (err){

      }
      else{
        //update data entry and restore in connections
      }
    })
  }
  else if(req.body[1] == 'response'){
    //find the user connection, either delete or accept, then add the user also to the chat list
}
  // Users.find().exec(function(err, data){ //test script to intialize user connections objects
  //   console.log(data.length);
  //   for (var x = 0; x<data.length; x++){
  //     var userConnection = new UsersConnections();
  //     userConnection.username = data[x].username;
  //     userConnection.displayName = data[x].displayName;
  //     userConnection.email = data[x].email;
  //     // console.log(userConnection);
  //     userConnection.save(function (err) {
  //       if (err) {
  //         return res.status(422).send({
  //           message: errorHandler.getErrorMessage(err)
  //         });
  //       } else {
  //         console.log(userConnection);
  //       }
  //     });
  //   };
  //
  // })

}
/**
 * List of Articles
 */
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
// }
