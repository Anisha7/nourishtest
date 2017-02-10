(function () {
  'use strict';

  angular
    .module('mealPlanner.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$stickyStateProvider' ,'$urlRouterProvider'];

  function routeConfig($stateProvider, $stickyStateProvider, $urlRouterProvider) {
    $stateProvider
      .state('mealPlanner', {
        url: '/meals',
        templateUrl: '/modules/mealPlanner/client/views/browse.client.view.index.html',
        controller: 'BrowseController',
        controllerAs: 'vm'
        // controller: 'ChatController',
        // controllerAs: 'vm',
        // data: {
        //   roles: ['user', 'admin'],
        //   pageTitle: 'Chat'
        // }
      })
      .state('userMP', {
        abstract: true,
        url: '/myMeals',
        templateUrl: '/modules/mealPlanner/client/views/mealPlanner-index.client.view.html',
        sticky: true
      })
      .state('userMP.calendarTest', {
        url: '/calendar',
        templateUrl: '/modules/mealPlanner/client/views/UserViews/mealPlanner-calendar.client.view.html',
        controller: 'MealCalendarController',
        controllerAs: 'vm'
      })
      .state('userMP.userBrowse', {
        // abstract: true,
        url: '/browse',
        templateUrl: '/modules/mealPlanner/client/views/mealPlanner-browse.client.view.html',
        controller: 'BrowseController', //switch out controller for a user browse controller
        controllerAs: 'vm',
        sticky: true
      })
      .state('userMP.userBrowse.viewRecipe', { //eventually do the same thing as is in
        url: '/testingStill',
        views:{
          'viewRecipeOrSearch': {
            templateUrl: '/modules/mealPlanner/client/views/recipeViews/viewRecipe.client.view.html',
            controller: 'RecipeController',
            controllerAs: 'vm'
          }
        },
        params: {
          recipe: null
        },
        sticky:true
      })
      .state('userMP.userBrowse.viewRecipe.recipeNutrition', {
        url: '', //eventually this should be the recipe id
        templateUrl: '/modules/mealPlanner/client/views/recipeViews/recipeNutrition.client.view.html'
      })
      .state('userMP.userBrowse.viewRecipe.recipeAddToCalendar', {
        url: '', //eventually this should be,
        templateUrl: '/modules/mealPlanner/client/views/recipeViews/recipeAddToCalendar.client.view.html'
      })
      .state('userMP.addRecipe', {
        url: '/addRecipe',
        templateUrl: '/modules/mealPlanner/client/views/UserViews/mealPlanner-addRecipe.client.view.html',
        controller: 'AddRecipeController',
        controllerAs: 'vm'
      })
      .state('userMP.test', {
        url: '/edamamTest',
        templateUrl: '/modules/mealPlanner/client/views/UserViews/mealPlanner-test.client.view.html',
        controller: 'AddRecipeController',
        controllerAs: 'vm'
      });
      // $stickyStateProvider.enableDebug(true);

  }
}());

//figure out how to set up a condition such that if not logged in, display regular meals page else display the navigatable page
