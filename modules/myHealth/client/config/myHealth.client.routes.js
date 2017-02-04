(function () {
  'use strict';

  angular
    .module('myHealth.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('myHealth', {
        abtract:true,
        url: '/myHealth',
        templateUrl: '/modules/myHealth/client/views/myHealth.client.view.index.html',
        controller: 'MyHealthController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'MyHealth'
        }
      })
      .state('myHealth.tracker', {
        url: '/myHealth/tracker',
        templateUrl: '/modules/myHealth/client/views/myHealth.client.view.tracker.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('myHealth.mealConfig', {
        url: '/myHealth/mealConfig',
        templateUrl: '/modules/myHealth/client/views/myHealth.client.view.mealConfig.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('myHealth.healthConfig', {
        url: '/myHealth/mealConfig',
        templateUrl: '/modules/myHealth/client/views/myHealth.client.view.healthConfig.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
}());
