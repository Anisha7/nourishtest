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

// mongoose.connect("mongodb://localhost:27017/mean-dev/TestArticles");
/**
 * Create an article
 */
exports.create = function (req, res) {
  console.log(req.body);
  var article = new Article(req.body);
  article.user = req.user;

  article.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};


/**
 * Create a test article
 */
exports.testCreate = function (req, res) {

  var testArticle;
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    console.log(fields);

    // console.log(fields.article);
    // console.log(fields['stuff']);
    //create testArticle object in here, save the img title to the imgs array
    //save after
    testArticle = new TestArticle(fields);
    //just create a better constructer function in the model that extracts info from the fields etc
    // testArticle.title=fields.article;
    testArticle.testArticleConstructor(fields,'temp',req.user);
    // testArticle.tags=fields.object[0];
    // console.log(testArticle);
    // console.log(files);
    // console.log(Object.keys(files)[0].path);
    // console.log(files['articleImages[0]'][0]);
    // saveImage(files['articleImages[0]'][0]);
    // console.log(files.articleImages[0]);

    // saveImage(Object.keys(files)[0]);
    Object.keys(files).forEach(function(name) {
        // console.log(files[name][0]);
        var path= saveImage(files[name][0]);
        console.log("path:  "+ path);
        // console.log(path);
        testArticle.imgs.push(path);

        console.log(testArticle.imgs);
        console.log('got file named ' + name);
    });
    testArticle.layout= testArticle.imgs.length;
    testArticle.user=req.user;
    console.log(testArticle);
    testArticle.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(testArticle);
      }
    });
    // console.log(testArticle);
    // form.on('field',function(name,val){
    //     console.log(name + val);
    // });
    // console.log(files.articleImages);
    // console.log(files.object);
    // saveImage(files.articleImages[0]);
  });


  // uploadImage();
  function saveImage(file){
    var imgPath='./modules/articles/client/img/'+file.originalFilename;
    // console.log(file);
    fs.readFile(file.path,function(err,data){
      // imgPath+= file.originalFilename;

      fs.writeFile(imgPath, data, function(err){
        if (err){
          return console.log(err);
        }
        // return assignImages(imgPath);
        // console.log(imgPath.toString());
        // console.log('file was saved');
      });
      // return assignImages(imgPath);
    });
    return imgPath;
    // return imgPath.toString();
  }
  function assignImages(imgPath){
    // console.log(imgPath);
    return imgPath;
    // return imgPath;
    // article.imgs.push(imgPath);
  }
  // console.log(req.body);
  // var testarticle= new TestArticle(req.body);
  // console.log('config:'+config.uploads.profile.image);
  // console.log(sick);
  // console.log(req.body.params[0]);
  // var testArticle = new testArticle(req.body);
  // testarticle.user = req.user;
  //look at users.profile.server.controller for how to upload images
  // testarticle.imgs.push(req.body.imgs);
  // console.log(testarticle.imgs[0]);
  // console.log('end testarticle');
  // console.log(req.files);
  // console.log(req.body);

  //modify this to have location of storage stored in mongodb object
  function uploadImage (){
    makeFile(req, res, function(err) {
      if(err) {
        console.log('Error Occured');
        return;
      }
      console.log("filemade");
    });
    upload(req, res, function(err) {
      if(err) {
        console.log('Error Occured');
        return;
      }

      // request.files is an object where fieldname is the key and value is the array of files
      console.log(req.files);
      res.end('Your Files Uploaded');
      console.log('Photo Uploaded');
    });
  }
  //
  // testArticle.save(function (err) {
  //   if (err) {
  //     return res.status(422).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   } else {
  //     res.json(testArticle);
  //   }
  // });
};
exports.testArticleUpdate = function(req, res){
  // console.log(req.body);
  // console.log(req.user)
  // console.log(req.article);
  // route the update type through here (comment, article edit, article deletion)
  console.log(req.body);
  if (req.body.type=="addComment")
    addTestArticleComment(req,res);
    // console.log(updatedArticle);

}
function addTestArticleComment(req,res){
  // console.log(req.body);
  // console.log(req.user)
  // console.log(req.article);
  var comment = {};
  // comment.username= req.user.displayName.toString();
  // var displayName= req.user.displayName.toString();
  // comment.h='h';
  comment.PostedBy= req.user;
  comment.date= new Date();
  comment.text= req.body.content;

  var article= req.article;
  article.comments.push(comment);
  // console.log(comment);
  // console.log("user:  "+ article.comments[0]);
  article.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });

}
exports.addTestArticleComment= function(req, res){
  var article = req.article;

  article.comments.push(req.comments);

  article.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
}
exports.editArticle = function(req,res){
   //use fs unlink to remove files
}
/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var article = req.article ? req.article.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

  // console.log('HELLOW');
  // console.log(article);
  res.json(article);
};

exports.testRead = function(req, res){

  var article = req.article ? req.article.toJSON() : {};
  // console.log('in test read');
  // console.log(article);
  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

  res.json(article);
}
/**
 * Update an article
 */
exports.update = function (req, res) {
  var article = req.article;

  article.title = req.body.title;
  article.content = req.body.content;

  article.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var article = req.article;

  article.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  // console.log(req.user);
  if (!req.query.displayName){  //edit this eventually

    Article.find().sort('-created').populate('user', 'displayName').exec(function (err, articles) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(articles);
      }
    });
  }
  else{
    Article.find({user:req.user}).sort('-created').populate('user', 'displayName').exec(function (err, articles) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(articles);
      }
    });
  }
};
exports.testList = function(req, res){
  TestArticle.find().sort('-created').populate('user', 'displayName').exec(function (err, articles) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
}
exports.testSearch = function(req, res){ //parse the test article data base for articles matching search values
  // console.log(req);
  console.log('in search');
  // console.log(req.query.searchValue);
  var regex = ".*"+req.query.searchValue+".*";
  // TestArticle.find({$or: [{"title":{$regex:regex} },{"tags": {$regex: regex} }]}).sort('created').populate('user','displayName').exec(function(err,articles){
  //     if(err){
  //       console.log(err);
  //       res.status(200);
  //     }
  //     else{
  //       console.log(articles);
  //       res.status(200);
  //     }
  // });
}
/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {

  // console.log('made it to articleBy ID');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Article is invalid'
    });
  }

  Article.findById(id).populate('user', 'displayName').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.article = article;
    next();
  });
};

/**
 * Test Article middleware
 */
exports.testArticleByID = function (req, res, next, id) {
  // console.log('testArticlebyida');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Article is invalid'
    });
  }

  TestArticle.findById(id).populate('user', 'displayName').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.article = article;
    next();
  });
};

/**
  *Url Management Methods
  */

exports.addUrl = function(req,res){
  console.log(req.body);
  var urlStorage= new UrlStorage(req.body);
  urlStorage.user = req.user;
  console.log(urlStorage.url);
  urlStorage.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(urlStorage);
    }
  });

}

exports.listUrls = function(req,res){
  // console.log('in list');
  UrlStorage.find().sort('-created').populate('user', 'displayName').exec(function (err, urls) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(urls);
    }
  });
}
