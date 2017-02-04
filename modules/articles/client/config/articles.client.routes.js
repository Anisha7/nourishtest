(function () {
  'use strict';

  angular
    .module('articles.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$stickyStateProvider'];

  function routeConfig($stateProvider, $stickyStateProvider) {
    $stateProvider
      .state('articles', {
        abstract: true,
        url: '/articles',
        template: '<ui-view/>'
      })
      .state('articles.list', {
        url: '',
        templateUrl: '/modules/articles/client/views/list-articles.client.view.html',
        controller: 'ArticlesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Articles List'
        }
      })
      .state('articles.view', {
        url: '/:articleId',
        templateUrl: '/modules/articles/client/views/view-article.client.view.html',
        controller: 'ArticlesController',
        controllerAs: 'vm',
        resolve: {
          articleResolve: getArticle
        },
        data: {
          pageTitle: 'Article {{ articleResolve.title }}'
        }
      })
      .state('myArticles', {

        url: '/myArticles',
        templateUrl: '/modules/articles/client/views/manage-articles.client.view.html',
        controller: 'ManageArticlesController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Manage Articles'
        },
        sticky: true
      })
      // .state('articles.myArticles', {
      //   // abstract:true,
      //   url: '',
      //   templateUrl:'/modules/articles/client/views/list-articles.client.view.html',
      //   controller: 'ArticlesListController',
      //   controllerAs: 'vm',
      //   data: {
      //     pageTitle: 'Articles List'
      //   }
      // })
      .state('articles.testView', {
        url: '-testView',
        params: {
            key: null
        },
        templateUrl:'/modules/articles/client/views/testView-article.client.view.html',
        controller: 'TestArticlesController',
        controllerAs: 'vm',
      })
      .state('myArticles.viewer', {
        url: '/:articleId',
        views: {
          'viewArticle':{
            templateUrl: '/modules/articles/client/views/articleViews/ogtestview-article.client.view.html',
            controller: 'ArticlesController',
            controllerAs: 'vm',
            resolve: {
              articleResolve: getArticle
            },
            data: {
              pageTitle: 'Article {{ articleResolve.title }}'
            }
          }
        }

      })
      .state('myArticles.addArticle', {
        url:'',
        // controller: 'ManageArticlesController',
        // controllerAs: 'vm',

        views: {
          'addArticleOrUrl': {
            templateUrl:'/modules/articles/client/views/add-articles.client.view.html'
            // controller: 'CustomArticlesController',
            // controllerAs: 'vm',
            // resolve: {
            //   articleResolve: getCustomArticle
            // },
            // data: {
            //   pageTitle: 'Article {{ articleResolve.title }}'
            // }
          }
        }
      })
      .state('myArticles.addURL', {
        url: '',
        views: {
          'addArticleOrUrl': {
            templateUrl: '/modules/articles/client/views/add-url-articles.client.view.html'
            //controller is manage articles
          }
        }
      })
      .state('customArticles', {
        // abstract:true,
        url: '/customArticles',
        templateUrl: '/modules/articles/client/views/customArticles/customList-articles.client.view.html',
        controller: 'CustomManageArticlesController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Custom Manage Articles'
        },
        sticky: true

      })
      .state('customArticles.view', {
        url: '/:customArticleId',
        // url:'',
        // controller: 'CustomArticlesController',
        // controllerAs: 'vm',
        views: {
          'viewCustomArticle': {
            templateUrl: '/modules/articles/client/views/customArticles/customView-articles.client.view.html',
            controller: 'CustomArticlesController',
            controllerAs: 'vm',
            resolve: {
              articleResolve: getCustomArticle
            },
            data: {
              pageTitle: 'Article {{ articleResolve.title }}'
            }
          }
        }

      });
  }

  getArticle.$inject = ['$stateParams', 'ArticlesService'];

  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  getCustomArticle.$inject = ['$stateParams', 'CustomArticlesService'];

  function getCustomArticle($stateParams, CustomArticlesService)  {
    // console.log ('id: ' +$stateParams.articleId);
    //write custom get method for retrieving articles
    return CustomArticlesService.get({
      customArticleId: $stateParams.customArticleId
    }).$promise;
  }
}());
