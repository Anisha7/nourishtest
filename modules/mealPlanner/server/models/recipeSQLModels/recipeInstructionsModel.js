var Sequelize = require("sequelize");
var sequelize = new Sequelize ('Nourish', 'root', 'NourishTest');
var RecipeInstructionsModel = sequelize.define('RecipeInstructionsModel', {
  title: { type: Sequelize.STRING, allowNull: false}, //set as primary key
  instructionNumber: {type: Sequelize.INTEGER, allowNull:false},
  instruction: {type: Sequelize.STRING(10000), allowNull:false}
  // tags
})

module.exports = RecipeInstructionsModel;
