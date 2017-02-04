(function () {
  'use strict';

  angular
    .module('mealPlanner')
    .controller('BrowseController', BrowseController);

//Use the browse controller to load recipe lists?, process recipe search functions
//Eventually convert this to a 'user browse'
  BrowseController.$inject = ['$scope', 'Authentication', '$http'];

  function BrowseController($scope, Authentication, $http) {
    var vm = this;

    vm.user=Authentication.user;
    // vm.article = article;
    vm.authentication = Authentication;
    $scope.data=[];
    console.log(vm.user)
    if (!vm.user){
      console.log('gonna have to do some rerouting');
    }
    init();
    function init(){
      //Switch to service for this eventually
      $http.get('/api/browse/recipes').success(function(response) { //fills the initial table
                      $scope.data = response[0].results;
                      console.log(response[0].results);
                      $scope.apply;
                      // console.log(response);
                      // console.log($scope.data);
                      // console.log($scope.data.Dish);
                  }).error(function(error)
              {
                console.log("Error");
          //some code
              });
      return;
    }
    $scope.viewMeal=function(recipe){
          // console.log(recipe);
          $scope.currentRecipe=recipe;
          if (recipe==-1){
            $scope.currentRecipe={};
            //clear out all information
          }
          $scope.getInfo=!$scope.getInfo;
    }
  }
}());
