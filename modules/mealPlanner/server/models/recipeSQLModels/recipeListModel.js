
var Sequelize = require("sequelize");
var sequelize = new Sequelize ('Nourish', 'root', 'NourishTest');
var RecipeListModel = sequelize.define('recipeListModel', {
  title: { type: Sequelize.STRING, allowNull: false}, //set as primary key
  // mealType: {type: Sequelize.STRING, allowNull: true},
  // dietaryLabel: {type: Sequelize.STRING, allowNull: false},
  // rating: {type: Sequelize.FLOAT, allowNull: true},
  img: {type: Sequelize.STRING, allowNull: false},
  cookTime: {type: Sequelize.INTEGER, allowNull: false},
  numberIngredients: {type: Sequelize.INTEGER, allowNull:false},
  nutritionFound: {type: Sequelize.BOOLEAN, allowNull: false},
  source: {type: Sequelize.STRING, allowNull: false},
  servings: {type: Sequelize.INTEGER, allowNull: true} 
  // numberDirections: {type: Sequelize.INTEGER, allowNull:false}
  //image
  // tags
});

module.exports = RecipeListModel;

// RecipeListModel.sync({force: true}).then(function () {
//   // Table created
//   return RecipeListModel.create({
//     title: 'Test1',
//     mealType: 'Dinner',
//     dietaryLabel: 'vegetarian',
//
//     cookTime: 10
//   });
// });
