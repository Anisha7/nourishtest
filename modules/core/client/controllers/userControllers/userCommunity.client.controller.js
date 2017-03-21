(function () {
  'use strict';

  angular
    .module('core')
    .controller('UserCommunityController', UserCommunityController);

  UserCommunityController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$http'];

  function UserCommunityController($scope, $state, Authentication, menuService, $http) {
    var vm = this;
    vm.user=Authentication.user;
    // console.log(vm.user);
    // console.log(Authentication.user);
    $scope.userSearch = [];
    $scope.AddingUser = false;
    $scope.UserToAdd = {};
    console.log('using controller');
    $scope.communitySearch = function(communitySearchValue){
      //do an http get to search user database by user name and return information?
      // console.log(communitySearchValue);
      if (!communitySearchValue){
        console.log('empty');
        $scope.userSearch = [];
      }

      else{
        $scope.userSearch = [];
        $http.get('/api/connections/search', {params:{SearchValue:communitySearchValue}})
          .success(function(data){
            // console.log(data)
            $scope.communitySearchValue = '';
            for (var x = 0; x < data.length; x ++){
              $scope.userSearch.push(data[x]);
            }
          })
          .error(function(err){
            console.log(err);
          })
        }
    }
    $scope.openUserAdd = function(user){
      // console.log(user);

      if ($scope.UserToAdd.username){
        console.log('here');
        $scope.UserToAdd = {};
      }
      else {
        $scope.UserToAdd.username = user.username;
        $scope.UserToAdd.displayName = user.displayName;
        // console.log($scope.UserToAdd);
        // $scope.apply();
      }
      console.log('here 2');
      $scope.AddingUser=!$scope.AddingUser;

    }
    $scope.addUser = function(user){
      $http.post('/api/connections/add', [user, 'request']).success(function(data){
        alert('request sent');
      })
      .error(function(err){

      })
    }
    $scope.triggerEvent = function(){
      $http.post('/api/connections/add').success(function(data){

      })
      .error(function(err){

      });
    }
  }
}());
