(function () {
  'use strict';

  angular
    .module('mealPlanner')
    .controller('RecipeController', RecipeController);

//Use the browse controller to load recipe lists?, process recipe search functions
//Eventually convert this to a 'user browse'
  RecipeController.$inject = ['$scope', 'Authentication', '$http', '$state', '$stateParams', 'moment','calendarConfig'];

  function RecipeController($scope, Authentication, $http, $state, $stateParams,moment, calendarConfig) {
    var vm = this;

    vm.user=Authentication.user;
    // vm.article = article;
    vm.authentication = Authentication;
    $scope.data=[];
    $scope.temp={};
    $scope.currentRecipeView={};
    $scope.event = {


    };
    // console.log(vm.user)
    // if (!vm.user){
    //   console.log('gonna have to do some rerouting');
    // }
    init();

    function init(){
      console.log($stateParams.recipe);
      if ($stateParams.recipe){
        $scope.currentRecipeView=$stateParams;
        $scope.event = {
          title: $scope.currentRecipeView.recipe.title,
          startsAt: moment().startOf('day').toDate(),
          endsAt: moment().endOf('day').toDate(),
          color: calendarConfig.colorTypes.important,
          draggable: true,
          recipeId: $scope.currentRecipeView.recipe.id
        }
      }
      else{
        $state.go("userMP.userBrowse");
      }
    }
    $scope.testCurrentRecipe = function(){
      console.log($scope.currentRecipeView);
    }
    $scope.saveToCalendar = function (event){
      //verify contents of event
      // console.log($scope.event);
      $http.post('/api/mealPlanner', event).success(function(data){
        console.log('seucces');
        init();
        alert('added to calendar');
      })
      .error(function(err){
        console.log('error');
      })
    }
    vm.toggle = function($event, field, event){
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    }
  }
}());
