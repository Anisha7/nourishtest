(function () {
  'use strict';

  angular
    .module('core')
    .controller('UserHomeController', UserHomeController);

  UserHomeController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$http'];

  function UserHomeController($scope, $state, Authentication, menuService, $http) {
    var vm = this;
    vm.user=Authentication.user;
    // console.log(vm.user);
    // console.log(Authentication.user);
    vm.events = [];
    init();
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
    function init(){
      $http.get('/api/mealPlanner').success(function(data){
        // console.log(data);
        for (var x= 0;x<data.length;x++){
          // console.log(data[x].user)
          vm.events.push(data[x]);
        }
      })
      .error(function(err){
        console.log(err);
      })
    }

  }
}());
