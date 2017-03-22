(function () {
  'use strict';

  angular
    .module('articles')
    .controller('TestArticlesController', TestArticlesController);

  TestArticlesController.$inject = ['ArticlesService' , 'Authentication', '$http' ,'$scope', '$state', '$stateParams'];

  function TestArticlesController(ArticlesService, Authentication, $http, $scope, $state, $stateParams) {
    var vm = this;
    // console.log(Authentication.user.displayName);
    init();
    // $scope.cat=false;
    //gonna have to edit this so that it goes to a different path
    function init(){
      console.log('changed page');
      console.log($stateParams);
    }
  }
}());
