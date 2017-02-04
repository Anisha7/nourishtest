// (function () {
//     'use strict';
//
//     angular
//         .module('app')
//         .factory('RecipesService', Service);
//
//     function Service($http, $q) {
//         var service = {};
//
//         // service.GetCurrent = GetCurrent;
//         // service.GetAll = GetAll;
//         // service.GetById = GetById;
//         // service.GetByUsername = GetByUsername;
//         // service.Create = Create;
//         // service.Update = Update;
//         // service.Delete = Delete;
//         service.addFavorite=addFavorite;
//         service.getAllFavorites=getAllFavorites;
//         service.getUserFavorites=getUserFavorites;
//         //add favorites, delete favorite, viewall, recipe search methods
//
//         return service;
//
//         function addFavorite(recipeId,user){
//           return $http.post('/api/userRecipes/addFavorite', {UserName:user,recipeId:recipeId}).then(handleSuccess, handleError);
//         }
//
//         function getAllFavorites(){
//           return $http.get('/api/userRecipes/getAllFavorites').then(handleSuccess, handleError);
//         }
//         function getUserFavorites(user){
//
//           return $http.get('/api/userRecipes/getUserFavorites',{params:{UserName:user}}).then(handleSuccess,handleError);
//         }
//         function loadPages(sortStyle, number){
//           //get list of initial recipes n shizzzzznet
//         }
//         function complexSearch(values){
//
//         }
//         function search(value){
//
//         }
//
//
//         // function GetCurrent() {
//         //     return $http.get('/api/users/current').then(handleSuccess, handleError);
//         // }
//         //
//         // function GetAll() {
//         //     return $http.get('/api/users').then(handleSuccess, handleError);
//         // }
//         //
//         // function GetById(_id) {
//         //     return $http.get('/api/users/' + _id).then(handleSuccess, handleError);
//         // }
//         //
//         // function GetByUsername(username) {
//         //     return $http.get('/api/users/' + username).then(handleSuccess, handleError);
//         // }
//         //
//         // function Create(user) {
//         //     return $http.post('/api/users', user).then(handleSuccess, handleError);
//         // }
//         //
//         // function Update(user) {
//         //     return $http.put('/api/users/' + user._id, user).then(handleSuccess, handleError);
//         // }
//         //
//         // function Delete(_id) {
//         //     return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
//         // }
//
//         // private functions
//
//         function handleSuccess(res) {
//             console.log(res.data);
//             return res.data;
//         }
//
//         function handleError(res) {
//             console.log('handling error');
//             return $q.reject(res.data);
//         }
//     }
//
// })();
