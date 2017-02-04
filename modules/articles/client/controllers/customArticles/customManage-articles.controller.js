(function () {
  'use strict';

  angular
    .module('articles')
    .controller('CustomManageArticlesController', CustomManageArticlesController);

  CustomManageArticlesController.$inject = ['ArticlesService' , 'Authentication', '$http' ,'$scope', '$state', 'Upload'];

  function CustomManageArticlesController(ArticlesService, Authentication, $http, $scope, $state, Upload) {
    var vm = this;
    // console.log(Authentication.user.displayName);
    init();
    // $scope.catfuck=false;
    //gonna have to edit this so that it goes to a different path
    function init(){
      // $scope.catfuck=false;
      $http.get('/api/testArticles').success(function(articles){
        vm.articles=articles;
        // console.log(articles);
      })
      .error(function(err){
        console.log('error');
      });
      $http.get('/api/url').success(function(urls){
        vm.urls=urls;
      })
      .error(function(err){
        console.log('error');
      });
      // $scope.$state=$state;
      // console.log($state)
    }
    // vm.articles = ArticlesService.query(function(articles){
    //   // console.log(articles);
    // });
    // alert(ArticlesService.query());
    $scope.showAdd=function(div){
      // console.log("1"+ $scope.catfuck);
      console.log(div + $scope.catfuck);
      $scope.catfuck=!$scope.catfuck;
    }



    $scope.viewArticle=function(){
      $state.go('articles.testView', {'key':'KEYYA'});
    }
    $scope.customArticleSearch = function(value){
      console.log(value + $scope.customArticleSearchValue);
      $http.get('/api/articlesearch').success(function(data){
         console.log('success');

      })
      .error(function(err){
          console.log(err);
      });
      // $http.get('/api/testArticles/search',{params:{searchValue:value}}).success(function(data){
      //   vm.articles=data;
      // })
      // .error(function(err){
      //   console.log('error');
      // })
    }
    function formVerification(){
      //modify a directive to target specific errors and filter the type in the controller
      return 0;
    }
  }
}());
