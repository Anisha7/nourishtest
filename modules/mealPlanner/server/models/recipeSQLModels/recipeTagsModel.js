
var Sequelize = require("sequelize");
var sequelize = new Sequelize ('Nourish', 'root', 'NourishTest');
var RecipeTagsModel = sequelize.define('recipeTagsModel', {
  title: { type: Sequelize.STRING, allowNull: false}, //set as primary key
  // mealType: {type: Sequelize.STRING, allowNull: true},
  // dietaryLabel: {type: Sequelize.STRING, allowNull: false},
  // rating: {type: Sequelize.FLOAT, allowNull: true},
  tag: {type: Sequelize.STRING, allowNull: false}

  // numberDirections: {type: Sequelize.INTEGER, allowNull:false}
  //image
  // tags
});

module.exports = RecipeTagsModel;
