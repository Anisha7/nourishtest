(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeUserController', HomeUserController);

  HomeUserController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$http'];

  function HomeUserController($scope, $state, Authentication, menuService, $http) {
    var vm = this;
    vm.user=Authentication.user;
    // console.log(vm.user);
    // console.log(Authentication.user);
    $scope.addQuote = function(quote){
      console.log(quote);
      $http.post('/api/quotes', quote).success(function(data){
        $scope.quote = {};
        console.log(data);
      })
      .error(function(err){
        $scope.quote = {};
        console.log(err);
      });
    }

  }
}());
