'use strict';

/**
 * Module dependencies
 */
var articlesPolicy = require('../policies/articles.server.policy'),
  articles = require('../controllers/articles.server.controller'); //create multiple controllers to clean this stuff up
  // multiparty = require('connect-multiparty'), // maybe can delete the multiparty
  // multipartyMiddleware = multiparty();

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/articles').all(articlesPolicy.isAllowed)
    .get(articles.list)
    .post(articles.create);

  //userArticlesCollection Routes
  // Single article routes
  app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
    .get(articles.read)
    .put(articles.update)
    .delete(articles.delete);

  app.route('/api/testArticles').all(articlesPolicy.isAllowed)
    .get(articles.testList)
    .post(articles.testCreate);

  app.route('/api/testArticles/:customArticleId').all(articlesPolicy.isAllowed)
    .get(articles.testRead)
    .put(articles.testArticleUpdate);// Through the update method, route to add comment/edit article content

  app.route('/api/articlesearch').all(articlesPolicy.isAllowed) //dont forget to update policies
    .get(articles.testList);

  app.route('/api/url').all(articlesPolicy.isAllowed)
    .get(articles.listUrls)
    .post(articles.addUrl);
  // app.route('/api/testArticles/edit/:customArticleId').all(articlesPolicy.isAllowed)
  //   .put(articles.testArticleEdit);
  // app.route('/api/testArticles').all(articlesPolicy.isAllowed)
  //   .get(articles.testList)
  //   .post(articles.testCreate);
  // Finish by binding the article middleware
  app.param('customArticleId',articles.testArticleByID);
  app.param('articleId', articles.articleByID);
};
