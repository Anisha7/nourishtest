(function () {
  'use strict';

  angular
    .module('mealPlanner.services')
    .factory('RecipeService', RecipeService);

  RecipeService.$inject = ['$resource', '$log'];

  function RecipeService($resource, $log) {
    var Recipe = $resource('/api/testArticles/:customArticleId', {
      customArticleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });



    angular.extend(Recipe.prototype, {
      createOrUpdate: function () {
        var article = this;
        return createOrUpdate(Recipe);
      }
    });

    return Recipe;

    function createOrUpdate(recipe) {
      if (recipe._id) {
        return recipe.$update(onSuccess, onError);
      } else {
        return recipe.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(recipe) {
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
