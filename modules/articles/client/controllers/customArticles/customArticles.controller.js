(function () {
  'use strict';

  angular
    .module('articles')
    .controller('CustomArticlesController', CustomArticlesController);

  CustomArticlesController.$inject = ['$scope', 'articleResolve', 'Authentication', '$http'];

  function CustomArticlesController($scope, article, Authentication, $http) {
    var vm = this;
    vm.user=Authentication.user;
    console.log(vm.user);
    vm.article = article;
    // console.log(vm.article);
    vm.authentication = Authentication;
    vm.comment={};
    $scope.article = article;
    console.log(vm.article.comments[0]);
    function init(comment){}
    $scope.addComment= function(){ //to put the article as a whole or to just push the comment
      // console.log('adding comment');
      console.log(vm.comment);
      // console.log(article._id);
      vm.comment.type="addComment";
      $http.put('/api/testArticles/'+article._id,vm.comment).success(function(data){
        // vm.article=data;
        vm.comment={};
        console.log(data)
        vm.article.comments=data.comments;
        // $scope.article.comments=data.comments;
        // vm.apply;
        // $scope.$apply();
        console.log('success');
      })
      .error(function(err){
        console.log(err);
      });
      //send an http post or put request to api/testarticle/articleid or whatever
    }
    $scope.removeComment= function(){
      //or could for now, just have a delete option that pops up next to text boxes where
      //vm.article.comment._id== this.user
    }
  }
}());
