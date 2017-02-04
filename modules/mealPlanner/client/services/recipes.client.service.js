(function () {
  'use strict';

  angular
    .module('mealPlanner.services')
    .factory('RecipeService', RecipeService);

  RecipeService.$inject = ['$resource', '$log'];

  function RecipeService($resource, $log) {
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
