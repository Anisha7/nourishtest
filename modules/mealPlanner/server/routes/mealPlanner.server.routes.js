'use strict';

/**
 * Module dependencies
 */
// var articlesPolicy = require('../policies/articles.server.policy'),
  var browse = require('../controllers/browse.server.controller'),
      edamam = require('../controllers/edamam.server.controller'),
      mealPlanner = require('../controllers/mealPlanner.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/browse/recipes') // create server policies for post requests
  // .all(articlesPolicy.isAllowed)
    .get(browse.listRecipes);
    // .post(browse.addRecipeUrl);
    // .post(articles.create);

  app.route('/api/recipes')
    .get(browse.listRecipeUrl)
    .post(browse.addRecipeUrl);
  app.route('/api/edamam')

    .get(edamam.edamam);

  app.route('/api/mealPlanner')
    .get(mealPlanner.getEvents)
    .post(mealPlanner.createEvent);

  // app.param('recipeTempId',browse.RecipeTempByID);

  //userArticlesCollection Routes
  // Single article routes
  // app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
  //   .get(articles.read)
  //   .put(articles.update)
  //   .delete(articles.delete);
  //
  //   app.route('/api/testArticles').all(articlesPolicy.isAllowed)
  //     // .get(articles.testist)
  //     .post(articles.testCreate);
  // app.route('/api/testArticles').all(articlesPolicy.isAllowed)
  //   .get(articles.testList)
  //   .post(articles.testCreate);
  // Finish by binding the article middleware
  // app.param('articleId', articles.articleByID);
};
