(function () {
  'use strict';

  angular
    .module('articles')
    .controller('MealEventController', MealEventController);

  MealEventController.$inject = ['$scope', 'mealEventResolve', 'Authentication', '$http'];

  function MealEventController($scope, MealEvent, Authentication, $http) {
    var vm = this;
    vm.user=Authentication.user;
    $scope.mealEvent=[];

    vm.events = [];
    vm.events.push(MealEvent);
    $scope.leftOverIngredients= [];
    console.log($scope.mealEvent.length);
    init(MealEvent);
    function init(MealEvent){
      if (!MealEvent){
        //change to other state, maybe do an alert pop up
      }
      $scope.mealEvent.push(MealEvent);
      $scope.edit=true;
      $scope.finished=false;

    }
    $scope.eventFinish = function(){
      $scope.edit=false;
      $scope.finished=true;
    }
    $scope.addComment= function(){ //to put the article as a whole or to just push the comment

      //send an http post or put request to api/testarticle/articleid or whatever
    }
    $scope.removeComment= function(){

    }
    var count=0;
    $scope.reviewAddLeftOverIngredient= function(){
      var ingredientModel= {};
      ingredientModel.number = count+1;
      $scope.leftOverIngredients.push(ingredientModel);
    }
  }
}());
