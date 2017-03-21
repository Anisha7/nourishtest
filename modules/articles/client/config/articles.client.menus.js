(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Blogs',
      state: 'articles',
      type: 'dropdown',
      roles: ['*'] //roles: user, admin, healthmanager
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'articles', {
      title: 'List Articles',
      state: 'articles.list',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'articles',{
      title: 'My Articles',
      state: 'myArticles',
      roles: ['user', 'admin']
    });
    menuService.addSubMenuItem('topbar', 'articles', {
      title: 'Custom List Articles',
      state: 'customArticles',
      roles: ['user', 'admin']
    })
  }
}());
