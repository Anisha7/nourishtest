(function () {
  'use strict';

  angular
    .module('mealPlanner')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Browse Recipes',
      state: 'mealPlanner',
      // type: 'dropdown',
      roles: ['guest']
    });
    menuService.addMenuItem('topbar', {
      title: 'Browse Recipes',
      state: 'userMP.userBrowse',
      // type: 'dropdown',
      roles: ['user', 'admin', 'healthManager']
    });

    // menuService.addSubMenuItem('topbar', 'mealPlanner', {
    //   title: 'Browse Recipes', // Check that someone is logged in when attempting to use functionality, if not, route to login
    //   state: 'mealPlanner',
    //   roles: ['guest']
    // });
    //
    // menuService.addSubMenuItem('topbar', 'mealPlanner',{
    //   title: 'Browse Recipes',
    //   state: 'userMP.userBrowse',
    //   roles: ['user', 'admin']
    //
    // });

    // menuService.addSubMenuItem('topbar', 'mealPlanner', {
    //   title: 'Calendar',
    //   state: 'userMP.calendarTest',
    //   roles: ['user', 'admin']
    // });

  }
}());
