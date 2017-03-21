(function () {
  'use strict';

  angular
    .module('core')
    .run(routeFilter);

  routeFilter.$inject = ['$rootScope', '$state', 'Authentication'];

  function routeFilter($rootScope, $state, Authentication) {
    $rootScope.$on('$stateChangeStart', stateChangeStart);
    $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeStart(event, toState, toParams, fromState, fromParams) {
      // Check authentication before changing state
      if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
        var allowed = false;
        // console.log('statechange');
        // if (toState.name == 'userHome' && Authentication.user.roles != 'user'){
        //   // console.log($state);
        //   if (Authentication.user.roles  == 'admin'){
        //     // toState.name ='adminHome';[
        //     $state.go('adminHome').then(function(){
        //       storePreviousState(toState,toParams);
        //     })
        //   }
        //   if (Authentication.user.roles  == 'healthManager'){
        //     // toState.name ='healthManagerHome';
        //     console.log('health'); // this isnt working
        //     $state.go('healthManagerHome').then(function(){
        //       storePreviousState(toState,toParams);
        //     })
        //   }
        // }
        for (var i = 0, roles = toState.data.roles; i < roles.length; i++) {
          // console.log(roles[i]);
          if ((roles[i] === 'guest') || (Authentication.user && Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(roles[i]) !== -1)) {
            allowed = true;
            break;
          }
        }

        if (!allowed) {
          console.log('Not allowed');
          event.preventDefault();
          if (Authentication.user !== null && typeof Authentication.user === 'object') {
            $state.transitionTo('forbidden');
          } else {
            // console.log($state.previous);
            // console.log("enter");
            // console.log(toState.url);
              if (toState.url=="/"){// redirect to home if not logged in
                console.log('in here it is slash');
                $state.go('home').then(function(){
                  storePreviousState(toState,toParams);
                })
              }
              else{
                $state.go('authentication.signin').then(function () {
                  // Record previous state
                  storePreviousState(toState, toParams);
                });
              }
          }
        }
      }
    }

    function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
      // Record previous state
      storePreviousState(fromState, fromParams);
    }

    // Store previous state
    function storePreviousState(state, params) {
      // only store this state if it shouldn't be ignored
      if (!state.data || !state.data.ignoreState) {
        $state.previous = {
          state: state,
          params: params,
          href: $state.href(state, params)
        };
      }
    }
  }
}());
