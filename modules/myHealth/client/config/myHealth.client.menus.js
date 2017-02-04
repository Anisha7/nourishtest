(function () {
  'use strict';

  angular
    .module('myHealth')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'myHealth',
      state: 'myHealth'
    });
  }
}());
