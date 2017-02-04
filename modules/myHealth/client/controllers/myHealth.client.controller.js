(function () {
  'use strict';

  angular
    .module('myHealth')
    .controller('MyHealthController', MyHealthController);

  MyHealthController.$inject = ['$scope', '$state', 'Authentication'];

  function MyHealthController($scope, $state, Authentication, Socket) {
    var vm = this;

    vm.user= Authentication.user;

    init();

    function init() {
      // If user is not signed in then redirect back home
      console.log( vm.user);
    }


  }
}());
