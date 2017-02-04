(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ManageArticlesController', ManageArticlesController);

  ManageArticlesController.$inject = ['ArticlesService' , 'Authentication', '$http' ,'$scope', '$state', 'Upload'];

  function ManageArticlesController(ArticlesService, Authentication, $http, $scope, $state, Upload) {
    var vm = this;
    // console.log(Authentication.user.displayName);
    init();
    // $scope.catfuck=false;
    //gonna have to edit this so that it goes to a different path
    function init(){
      // $scope.catfuck=false;
      $http.get('/api/articles',{params:{displayName:Authentication.user.displayName}}).success(function(articles){
        vm.articles=articles;
        // console.log(articles);
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
    $scope.saveArticle=function(isValid){
      //initialize article here
      //if no errors, save or update article in database and reroute to display page
      //article info includes title, tags, content, img, template load type
      //save article, then load up the article view custom screen based on template type
      console.log(vm.article.imgs);
      if (!isValid){
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm'); // gotta figure out custom error messages..
        return false;
      }
      Upload.upload({
        url: '/api/testArticles',
        headers: {
              'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        data: {
          articleImages: vm.article.imgs,
          title: vm.article.title,
          content: vm.article.content,
          tags: vm.article.tags

          // object: 'title',
          // stuff: {'title':'stuff', 'content':'content', 'layout':"layout"},
          // article: 'article'
          // title: vm.article.title
        }
      }).then(function (response){
        $scope.catfuck=!$scope.catfuck;
        console.log('file success?');
      });

      // $http.post('api/testArticles',vm.article).success(function(article){
      //     console.log('digarooo');
      //     //then route to new article
      // })
      // .error(function(err){
      //     console.log('whooooooops');
      // });
      // vm.article={};
    }
    $scope.saveUrl = function(isValid){
      if (!isValid){
        $scope.$broadcast('show-errors-check-validity', 'vm.form.UrlForm'); // gotta figure out custom error messages..
        return false;
      }
      console.log(vm.Url);
      $http.post('/api/url', vm.Url).success(function(data){
        console.log('success');
        $state.go('myArticles');
        vm.Url={};
      })
      .error(function(err){
        console.log('nogood');
      });
    }
    $scope.testUpload= function(dataUrl) { //change to vm.upload, dataUrl is getting fucked up
      console.log(dataUrl[0]);
        Upload.upload({
          url: '/api/testArticles',
          headers: {
                'Content-Type': 'multipart/form-data'
          },
          method: 'POST',
          data: {
            articleImages: dataUrl[0],
            object: 'title',
            stuff: {'title':'stuff', 'content':'content', 'layout':"layout"},
            article: 'article'
            // title: vm.article.title
          }
        }).then(function (response){
          console.log('file success?');
        });
        // $http.post('/api/testArticles',{'articleImages':dataUrl[0]});
    };
    $scope.viewArticle=function(){
      $state.go('articles.testView', {'key':'KEYYA'});
    }
    function formVerification(){
      //modify a directive to target specific errors and filter the type in the controller
      return 0;
    }
  }
}());
