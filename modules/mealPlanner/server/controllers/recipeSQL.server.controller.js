'use strict';

/**
 * Module dependencies
 */
var vulgar = require("vulgar.js");
var _ = require('lodash');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var cheerio = require("cheerio");
var fs = require('fs');
var request = require('request');
var Q = require('q');
var Sequelize = require("sequelize");
var sequelize = new Sequelize ('Nourish', 'root', 'NourishTest',{
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }
});
var path = require('path');

var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var RecipeIngredientsModel = require('../models/recipeSQLModels/recipeIngredientsModel');
var RecipeTagsModel = require('../models/recipeSQLModels/recipeTagsModel');
var RecipeListModel = require('../models/recipeSQLModels/recipeListModel');
var RecipeInstructionsModel = require('../models/recipeSQLModels/recipeInstructionsModel');
var RecipeTotalNutritionModel = require('../models/recipeSQLModels/RecipeTotalNutritionModel')
var gramConvertions = {};
  gramConvertions.mcg = .000001;
  gramConvertions.mg = .001;
  gramConvertions.IU = 1;
  gramConvertions.g = 1;




exports.listRecipes= function(req, res){
  //check req.user, then search their specifications within sql database eventually

  RecipeListModel.findAll({}).then(function(data){
    console.log(data);
    res.json(data);
  })
}
exports.advancedSearch = function (req, res){

}

exports.addRecipeByUrl = function(req, res){
  // console.log(req.body);
  //check url to decide which recipe loader to use
  var recipe = eatingWellLoad(req.body.Url);
  sqlSave(recipe).then(function(){
    res.json('success! please check browse page');
  })
}

exports.viewRecipeInfo = function(req , res){

}

exports.getRecipeByID= function (req,res){
  //For getting info to display on the browse screen
  //use unirest in conjunction with acquiring the recipe rating and comments
  return;
}





//////////////// AddRecipeByURLFUNCTIONS
function downloadImage(IMGUrl){ //returns new img path

}
function extractUrlRecipeInfo(url, websiteName){ //returns a recipe object i guess
  //
}
/////////////////

exports.editRecipe= function(req,res){
  //create a database of recipe ratings and ids
  return;

}

exports.deleteRecipe= function(req,res){
  return;
}
exports.complexSearchRecipes= function(req,res){
  return;
}

//load url information from eating well url
function eatingWellLoad (url){
  var req = new XMLHttpRequest();

  req.open('GET', url, false);
  req.send(null);
  if (req.status == 200){
    var page = cheerio.load(req.responseText);
  }
  var recipe = {};
  recipe.recipeIngredients = [];
  recipe.recipeInstructions = [];
  recipe.recipeNutrition = [];
  recipe.recipeTags = [];
  recipe.recipeBrowse = {}; //stores recipeTitle, rating, cooktime, numberingredients, numberdirections, tags ie vegetarian, dinner,
  var recipeIngredient = {}; //stores recipeTitle, ingredient quantity, ingredient measurement, ingredient measurement abbrv?,ingredient, and fullrecipeLine
  var recipeInstructionObj = {}; //stores recipeTitle, instruction Number, instruction
  var recipeNutritionObj = {};
  var recipeTitle = ''

  var recipeTagObj = {}; //.title.tag
  recipeTitle = page('.recipeDetailHeader').text();
  recipe.recipeBrowse.title = recipeTitle;
  recipe.recipeBrowse.source = url;
  var imgPath = page('.recipeDetailSummaryImageMain').attr('src');

  recipe.recipeBrowse.img = imgPath;
  recipe.recipeBrowse.cookTime = page('span', 'time').text();
  recipe.recipeBrowse.servings = parseInt(page('span', '.servingsCount').text());
  // recipe.recipeBrowse.mealType = page('.toggle-similar__title').text();

  // page('.toggle-similar__title').each(function(i,elem){
  //   console.log(page(this).text());
  //   if (i == 3){
  //     recipe.recipeBrowse.mealType = page(this).text();
  //   }
  // })

  // console.log(recipe);
  page('a', '.nutritionTag').each(function(i,elem){
    recipeTagObj.title = recipeTitle;
    recipeTagObj.tag = page(this).text();
    recipe.recipeTags.push(recipeTagObj);
    recipeTagObj = {};
  });

  // console.log(recipeTags);
  page('span', '.checkListListItem').each(function(i,elem){
    recipeIngredient.title = recipeTitle;
    recipeIngredient.fullIngredient = page(this).text();
    if (recipeIngredient.fullIngredient != '')
      recipe.recipeIngredients[i] = recipeIngredient;
    // recipe.nutritionFound = false;
    // console.log(typeof(recipeIngredient.fullIngredient))
    recipeIngredient = {};
  });
  recipe.recipeBrowse.numberIngredients = recipe.recipeIngredients.length;
  // console.log(recipe.recipeIngredients);
  page('.recipeDirectionsListItem').each(function(i,elem){
    recipeInstructionObj.title = recipeTitle;
    recipeInstructionObj.instruction = page(this).text();
    recipeInstructionObj.instructionNumber = i+1;
    if (recipeInstructionObj.instruction != '')
      recipe.recipeInstructions[i] = recipeInstructionObj;

    recipeInstructionObj = {};
  })

  page('li', '.nutritionInfoList').each(function(i,elem){ //set up parentheses removal
    // console.log(page(this).attr('itemprop'));
    var nutrition = {};
    // console.log(page(this).find('span').text());
    // console.log(page(this).text().indexOf('Per serving'));
    if (page(this).text().indexOf('Per serving')!=-1){
      var text = page(this).find('span').text();
      // console.log(text);
      // console.log(text);
      var delimited = text.split('             ');
      // console.log(delimited);
      // var delimited = text.split('> ');
      recipe.recipeNutrition.title = recipeTitle;
      for (var x = 0; x < delimited.length; x++){
        // console.log(x+':  '+ delimited[x]);
        var delimited2 = delimited[x].split(' ');
        // console.log(delimi)
        // console.log(delimited[x]);
        for (var y = 0; y < delimited2.length; y++){
          // console.log('value:  '+ delimited[y]);
          if (!/^[a-zA-Z]+$/.test(delimited2[y]) && gramConvertions[delimited2[y+1]]){
            // nutrition.quantity = 5;
            nutrition.title = recipeTitle;
            nutrition.quantity = parseInt(delimited2[y]) * gramConvertions[delimited2[y+1]];
            nutrition.value = delimited2[y+2];
            if (delimited[y+3]!=undefined && !/^[a-zA-Z]+$/.test(delimited2[y+3])){
              // console.log('y+3: '+ delimited2[y+3]);
              nutrition.value+=delimited2[y+3];
            }
            break;
          }
          else if (!/^[a-zA-Z]+$/.test(delimited2[y]) && /^[a-zA-Z]+$/.test(delimited2[y+1])){
            // console.log('here');
            nutrition.title = recipeTitle;
            nutrition.quantity = delimited2[y-1];
            // nutrition.quantity = delimited2[y];
            nutrition.value = delimited2[y];
            break;
          }

        }
        // console.log(nutrition);
        if (nutrition.value.indexOf(';')){
          // console.log('found');
          nutrition.value = nutrition.value.split(';')[0];
        }
        if (nutrition.value.indexOf('(')){
          // console.log('found');
          nutrition.value = nutrition.value.split('(')[0];
        }
        if (nutrition.value.indexOf('vitaminA')!=-1){
          nutrition.value+="IU";
        }
        if (recipe.recipeBrowse.servings >1){
          nutrition.perServing = true;
        }
        else{
          nutrition.perServing = false;
        }
        recipe.recipeNutrition[nutrition.value]= nutrition.quantity;
        nutrition = {};
      }
    }
    // if (page(this).attr('itemprop') == "calories"){
    //   console.log('calories:  ' + page(this).text());
    // }
  })
  if (recipe.recipeNutrition){
    recipe.recipeBrowse.nutritionFound = true;
  }
  // console.log(recipe);
  // page('.') //get nutrition
  return recipe;
}

//save recipe to database
function sqlSave(recipe){
  // RecipeIngredientsModel.sync({force:true}).then(function(){
  //   // console.log(recipe.recipeIngredients[x]);
    // RecipeIngredientsModel.create(recipe.recipeIngredients[x]);
  // });

  //recipeListModel
  // RecipeListModel.sync({force:true}).then(function(){
    RecipeListModel.create(recipe.recipeBrowse);
  // });

  //recipeTags
  for (var x = 0; x < recipe.recipeTags.length; x++){
    // RecipeTagsModel.sync({force:true}).then(function(){
      RecipeTagsModel.create(recipe.recipeTags[x]);
    // });
  }

  //recipeIngredients
  for (var x = 0; x < recipe.recipeIngredients.length; x++){
    // RecipeIngredientsModel.sync({force:true}).then(function(){
      RecipeIngredientsModel.create(recipe.recipeIngredients[x]);
    // })
  }

  //recipeInstructions
  for (var x = 0; x < recipe.recipeInstructions.length; x++){
    // RecipeInstructionsModel.sync({force:true}).then(function(){
      RecipeInstructionsModel.create(recipe.recipeInstructions[x]);
    // })
  }

  //recipeNutrition
  // RecipeTotalNutritionModel.sync({force:true}).then(function(){
  var obj = {};
  obj.title = recipe.recipeNutrition.title;
  RecipeTotalNutritionModel.create(obj).then(function(){

    RecipeTotalNutritionModel.find({
      where: {
        title: {
          $like: '%'+recipe.recipeNutrition.title+'%'
        }
      }
    })
    .then(function(data){
      for (var key in data.dataValues){
        // console.log(key);
        if (recipe.recipeNutrition[key]){
          data[key] = recipe.recipeNutrition[key];
        }
      }
      data.save().then(function(){
        // console.log('save success');
      })
    })
  });
  // })

}
