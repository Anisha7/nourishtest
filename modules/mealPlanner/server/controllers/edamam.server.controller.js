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
  request = require('request'),
  http = require('http'),
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
        deferred.resolve(docs);
      }
      else{
        deferred.resolve();
      }
    });
    return deferred.promise;
  }
function edamamTest(){
  var post_options = {
     host: 'https://api.edamam.com',
     port: '80',
     path: '/search',
     method: 'GET',
     headers: {
       app_id:  'c8da0b7e',
       app_key: '465bb4fd29d4c31f13f917b9758facc3',
       q: 'salad'
     }
    //  headers: {
    //      'Content-Type': 'application/x-www-form-urlencoded',
    //      'Content-Length': Buffer.byteLength(post_data)
    //  }
  }
  var post_options2 = {
    host: 'https://api.edamam.com/search?q=chicken&app_id=c8da0b7e&app_key=465bb4fd29d4c31f13f917b9758facc3&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free',
    method: 'GET'
  }
  console.log('preHttp');
  // var req = http.request(post_options, function(res){
  //   res.on('data', function(data){
  //     console.log(data);
  //   });
  //     console.log('in results');
  //     console.log(res);
  // });
  var params = {
    url: 'http://api.edamam.com/search',
      agentOptions: {
      app_id:  'c8da0b7e',
      app_key: '465bb4fd29d4c31f13f917b9758facc3',
      q: 'chicken'}
  };
  var req = request.get(params).on('response',function(data){
    console.log(data.statusCode);
    console.log('this worked wow');
    console.log(data);
    // console.log(data.headers['content-type'])
  });
}
function edamamNutrientTest(){
  var params = { //recipe search
    url: 'https://api.edamam.com/api/nutrition-data',
    agentOptions: {
      app_id: 'c8da0b7e',
      app_key: '465bb4fd29d4c31f13f917b9758facc3',
      ingr: 'orange'
    }
  };
  var params2 = {  //nutrition analysis
    url: 'https://api.edamam.com/api/nutrition-data',
    app_id: '9437a29e',
    app_key: '445e45bdaeadf4477acfdcb1a4f87c80',
    ingr: 'orange'

  };
  function callback(error, response, body) {
  // if (!error && response.statusCode == 200) {
    console.log('callback');
    if (response.statusCode!==200){
      console.log(response.statusCode);
    }
    else{
      // console.log(body);
      var info= JSON.parse(body);
      console.log(info);
    }
    // var info = JSON.parse(body);
    // console.log(info);
    // console.log(info.stargazers_count + " Stars");
    // console.log(info.forks_count + " Forks");
  // }
  }
  // request(params2,callback);
  // request("https://api.edamam.com/api/nutrition-data?app_id=9437a29e&app_key=445e45bdaeadf4477acfdcb1a4f87c80&ingr=1%20large%20apple",callback);
  // var req = request.get("https://api.edamam.com/api/nutrition-data?app_id=c8da0b7e&app_key=465bb4fd29d4c31f13f917b9758facc3&ingr=1%20large%20apple").on('response', function(data){
  //   console.log(data.statusCode);
  //   console.log(data);
  // })
}
exports.edamam = function(req, res){
  // console.log('testing');
  console.log(req.query);
  // console.log(req.params);
  edamamNutrientTest();
  res.status(200);
}
exports.listRecipes= function(req, res){
  //just list a bunch of recipes walawala
  //might need to call the get ratings here
  getTestRecipes().then(function(obj){
    res.json(obj);
    // status(200).
  })
  .catch(function(err){
    res.status(404);
  })
}
