(function () {
  'use strict';

  angular
    .module('mealPlanner')
    .controller('AddRecipeController', AddRecipeController);

  AddRecipeController.$inject = ['$scope', 'Authentication', '$http'];

  function AddRecipeController($scope,  Authentication, $http) {
    var vm = this;

    // vm.article = article;
    vm.authentication = Authentication;
    $scope.edamamIngredient = {};
    $scope.recipe = {};
    $scope.recipeUrls=[];
    init();
    function init(){
      $http.get('/api/recipes').success(function(data){
        for (var x=0; x<data.length;x++){
          $scope.recipeUrls[x]=data[x];
        }
        // $scope.recipeUrls=data;
        console.log($scope.recipeUrls[0]);
      })
      .error(function(err){

      })
    }
    $scope.testAdd = function(){
      $http.post('/api/recipes').success(function(data){

      })
      .error(function(err){

      });
    }
    $scope.edamam = function(){
      $http.get('/api/edamam', {params:{Ingredients:$scope.edamamIngredient}}).success(function(data){
         console.log('success');
      })
      .error(function(err){
          console.log(err);
      });
    }
    $scope.addRecipe = function(){
      // console.log('did this function call?');

      $http.post('/api/recipes', $scope.recipe).success(function(data){
        //reroute to url of new recipe
        $scope.recipe.Url='';
        $scope.recipeUrl={};
        $scope.recipeUrl=data;
        console.log(data);
      })
      .error(function(err){
        $scope.recipe.Url='';
        $scope.recipeUrl={};
        alert('error');
      });
    }
  }
}());
