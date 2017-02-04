(function () {
  'use strict';

  angular
    .module('articles.services')
    .factory('CustomArticlesService', CustomArticlesService);

  CustomArticlesService.$inject = ['$resource', '$log'];

  function CustomArticlesService($resource, $log) {
    var Article = $resource('/api/testArticles/:customArticleId', {
      customArticleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });



    angular.extend(Article.prototype, {
      createOrUpdate: function () {
        var article = this;
        return createOrUpdate(article);
      }
    });

    return Article;

    function createOrUpdate(article) {
      if (article._id) {
        return article.$update(onSuccess, onError);
      } else {
        return article.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(article) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
