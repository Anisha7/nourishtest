(function () {
  'use strict';

  angular
    .module('mealPlanner.services')
    .factory('MealEventService', MealEventService);

  MealEventService.$inject = ['$resource', '$log'];

  function MealEventService($resource, $log) {
    var MealEvent = $resource('/api/mealPlanner/:mealEventId', {
      mealEventId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });



    angular.extend(MealEvent.prototype, {
      createOrUpdate: function () {
        var event = this;
        return createOrUpdate(event);
      }
    });

    return MealEvent;

    function createOrUpdate(event) {
      if (event._id) {
        return event.$update(onSuccess, onError);
      } else {
        return event.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(event) {
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
