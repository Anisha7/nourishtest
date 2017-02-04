(function () {
  'use strict';

  angular
    .module('myHealth')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Browse Recipes',
      state: 'mealPlanner',
      type: 'dropdown',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'mealPlanner', {
      title: 'Browse Recipes', // Check that someone is logged in when attempting to use functionality, if not, route to login
      state: 'mealPlanner',
      roles: ['guest']
    });

    menuService.addSubMenuItem('topbar', 'mealPlanner',{
      title: 'Browse Recipes',
      state: 'userMP.userBrowse',
      roles: ['user', 'admin']

    });

    menuService.addSubMenuItem('topbar', 'mealPlanner', {
      title: 'Calendar',
      state: 'mealPlanner',
      roles: ['user', 'admin']
    });

  }
}());
