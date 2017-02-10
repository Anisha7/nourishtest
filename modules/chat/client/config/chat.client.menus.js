(function () {
  'use strict';

  angular
    .module('chat')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Chat',
      state: 'chat',
      type: 'dropdown',
      roles: ['user', 'admin']
    });
    // menuService.addMenuItem('topbar', {
    //   title: 'Chat',
    //   state: 'chat'
    // });
    menuService.addSubMenuItem('topbar', 'chat', {
      title: 'Original Chat',
      state: 'chat',
      roles: ['user', 'admin']
    });
    menuService.addSubMenuItem('topbar', 'chat', {
      title: 'Encrypted Chat',
      state: 'eChat',
      roles: ['user', 'admin']
    });
  }
}());
