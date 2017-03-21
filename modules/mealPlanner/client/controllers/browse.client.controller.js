(function () {
  'use strict';

  angular
    .module('mealPlanner')
    .controller('BrowseController', BrowseController);

//Use the browse controller to load recipe lists?, process recipe search functions
//Eventually convert this to a 'user browse'
  BrowseController.$inject = ['$scope', 'Authentication', '$http', '$state', '$stateParams'];

  function BrowseController($scope, Authentication, $http, $state, $stateParams) {
    var vm = this;

    vm.user=Authentication.user;
    // vm.article = article;
    vm.authentication = Authentication;
    $scope.data=[];
    $scope.temp={};
    $scope.currentRecipeView={};
    $scope.advancedSearchParams = {};
    $scope.searchBox = false;
    // console.log(vm.user)
    // if (!vm.user){
    //   console.log('gonna have to do some rerouting');
    // }
    init();
    function init(){
      if ($stateParams)
        $scope.currentRecipeView=$stateParams;
      // else {
      //   $scope.currentRecipeView={};
      // }

      //Switch to service for this eventually
      $http.get('/api/browse/recipes').success(function(response) { //fills the initial table
            // for (var x= 0;x<response.length;x++){
            //   $scope.data[x]=response[x];
            // }
            // return response;
            // console.log(typeof(response));
            // $scope.temp =response;
            $scope.data=response; //causing an error for some reason
            // console.log(response[0].results);
            // $scope.apply;
        }).error(function(error){
          console.log("Error");
    //some code
        });
      // return;
    }

    $scope.manageAdvancedSearch = function(){
      $scope.searchBox = !$scope.searchBox;
      console.log($scope.searchBox);
    }
    $scope.conductAdvancedSearch = function(){

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
    $scope.currentRecipe = function(recipe){
      console.log(recipe);
      // $scope.currentRecipe={};
      // $scope.currentRecipe=recipe;
      $state.go('userMP.userBrowse.viewRecipe', {'recipe':recipe})
    }
    $scope.testCurrentRecipe = function(){
      console.log($scope.currentRecipeView);
    }
  }
}());
