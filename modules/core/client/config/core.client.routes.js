(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$stickyStateProvider'];

  function routeConfig($stateProvider, $urlRouterProvider, $stickyStateProvider) {
    console.log('in route config'); //watch here for temporary errors
    $urlRouterProvider.rule(function ($injector, $location) {
        console.log('in route config');
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if((path.length==1 && path[0]=='/') || path=='/home' ){

        // var newPath = '/myHome';
        // $location.replace().path(newPath);
        console.log('it is slash');
        // console.log($stateProvider);
        // $urlRouterProvider.otherwise(function ($injector, $location) {
          // console.log($location);
          if ($injector.get('Authentication').user){
            console.log('slash');
            var user = $injector.get('Authentication').user.roles[0];
            switch (user){
              case 'user':
                $location.replace().path('/myHome');
                break;
              case 'admin':
                $location.replace().path('/admin');
                break;
              case 'healthManager':
                $location.replace().path('/healthProvider');
                break;
              default:

                break;
            }
          }
          else{
            $location.replace().path('/home');
          }
          // console.log(user);

        // });
        // if ()
        // if ()
      }

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      // console.log($location);
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
      // console.log('it is slash');

    });

    $stateProvider
      .state('userHome', {
        abstract: true,
        url: '',
        templateUrl: '/modules/core/client/views/homeViews/userHome.client.view.html',
        // controller: 'HomeController',
        controller: 'UserHomeController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        },
        sticky: true
      })
      .state('userHome.mainView', {
        url: '/myHome',
        views: {
          'HomePanel1': {
            templateUrl: '/modules/core/client/views/homeViews/user/userMealPlanner.client.view.html',
            controller: 'UserMealPlannerController',
            controllerAs: 'vm'
          }
          // 'HomePanel2': {
          //   templateUrl:'/modules/core/client/views/homeViews/user/userPastEvents.client.view.html',
          //   controller: 'UserMealPlannerController',
          //   controllerAs: 'vm'
          // }
        }
      })
      .state('userHome.manageEvent', {
        url:'/myHome/manageEvent/:mealEventId',
        views: {
          'homePopUpDisplay1': {
            templateUrl: '/modules/core/client/views/homeViews/user/userManageEvent.client.view.html',
            controller: 'MealEventController', //Be Sure to initialize controller according to previous state maybe
            controllerAs: 'vm',
            resolve: {
              mealEventResolve: getMealEvent
            }
          }
        }
      })
      .state('userHome.community', {
        url:'/myHome/community',
        views: {
          'HomePanel1': {
            // templateUrl: 'modules/core/client/views/homeViews/user/userCommunity.client.view.html',

            templateUrl: '/modules/core/client/views/homeViews/user/userCommunity.client.view.html',
            controller: 'UserCommunityController', //maybe Change to
            controllerAs: 'vm'
          }
        }
      })
      .state('userHome.pastReviews', {
        url:'/myHome/pastReviews',
        views: {
          'HomePanel1': {
            templateUrl: '/modules/core/client/views/homeViews/user/userPastEvents.client.view.html'
          }
        }
      })
      .state('userHome.photos', {
        url:'/myHome/photos'
      })
      // .state('')
      .state('publicProfile', {
        url:':/username',
        templateUrl: '/modules/core/client/views/homeViews/publicProfile.client.view.html',
        resolve: {
          userResolve: getUserInfo
        },
        data: {
          pageTitle: 'Welcome {{userResolve.name}}',
          roles: ['user', 'admin', 'healthManager']
        }
      })
      .state('adminHome',{ //every time something is requested from the server, server must verify that requester is logged in and that they have valid rights to access
        url: '/admin',
        templateUrl: '/modules/core/client/views/homeViews/AdminHome.client.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('healthManagerHome', {
        url: '/healthProvider',
        templateUrl: '/modules/core/client/views/homeViews/HealthView.client.view.html',
        data: {
          roles: ['healthManager']
        }
      })
      .state('home', {
        url: '/home',
        templateUrl: '/modules/core/client/views/home1.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
          roles: ['guest']
        }
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: '/modules/core/client/views/404.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true,
          pageTitle: 'Not Found'
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: '/modules/core/client/views/400.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true,
          pageTitle: 'Bad Request'
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: '/modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Forbidden'
        }
      });
  }
  getUserInfo.$inject = ['$stateParams' ]
  function getUserInfo($stateParams){
    console.log($stateParams);
  }
  getMealEvent.$inject = ['$stateParams', 'MealEventService'];

  function getMealEvent($stateParams, MealEventService)  {
    // console.log ('id: ' +$stateParams.articleId);
    //write custom get method for retrieving articles
    console.log('GET MEAL EVENT: '+ $stateParams.mealEventId);
    if($stateParams.mealEventId){

      return MealEventService.get({
        mealEventId: $stateParams.mealEventId
      }).$promise;
    }
  }
}());
