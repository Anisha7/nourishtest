var Sequelize = require("sequelize");
var sequelize = new Sequelize ('Nourish', 'root', 'NourishTest');
var RecipeTotalNutritionModel = sequelize.define('RecipeTotalNutritionModel', {
  title: { type: Sequelize.STRING, allowNull: false}, //set as primary key
  // instructionNumber: {type: Sequelize.INTEGER, allowNull:false},
  // instruction: {type: Sequelize.STRING, allowNull:false},
  // tags
  perServing: {type: Sequelize.BOOLEAN, allowNull: true},
  water: {type: Sequelize.FLOAT, allowNull: true},
  calories: {type: Sequelize.FLOAT, allowNull: true},
  protein: {type: Sequelize.FLOAT, allowNull: true},
  fat: {type: Sequelize.FLOAT, allowNull: true},
  ash: {type: Sequelize.FLOAT, allowNull: true},
  carbohydrate: {type: Sequelize.FLOAT, allowNull: true},
  fiber: {type: Sequelize.FLOAT, allowNull: true},
  sugar: {type: Sequelize.FLOAT, allowNull: true},
  calcium: {type: Sequelize.FLOAT, allowNull: true},
  iron: {type: Sequelize.FLOAT, allowNull: true},
  magnesium: {type: Sequelize.FLOAT, allowNull: true},
  phosphorus: {type: Sequelize.FLOAT, allowNull: true},
  potassium: {type: Sequelize.FLOAT, allowNull: true},
  sodium: {type: Sequelize.FLOAT, allowNull: true},
  zinc: {type: Sequelize.FLOAT, allowNull: true},
  copper: {type: Sequelize.FLOAT, allowNull: true},
  maganese: {type: Sequelize.FLOAT, allowNull: true},
  selenium: {type: Sequelize.FLOAT, allowNull: true},
  vitaminC: {type: Sequelize.FLOAT, allowNull: true},
  thiamin: {type: Sequelize.FLOAT, allowNull: true},
  riboflavin: {type: Sequelize.FLOAT, allowNull: true},
  niacin: {type: Sequelize.FLOAT, allowNull: true},
  pantoAcid: {type: Sequelize.FLOAT, allowNull: true},
  vitaminB6: {type: Sequelize.FLOAT, allowNull: true},
  folateTotal: {type: Sequelize.FLOAT, allowNull: true},
  folicAcid: {type: Sequelize.FLOAT, allowNull: true},
  foodFolate: {type: Sequelize.FLOAT, allowNull: true},
  folateDFE: {type: Sequelize.FLOAT, allowNull: true},
  choline: {type: Sequelize.FLOAT, allowNull: true},
  vitaminB12: {type: Sequelize.FLOAT, allowNull: true},
  vitaminAIU: {type: Sequelize.FLOAT, allowNull: true}, //a measured in iu
  vitaminARAE: {type: Sequelize.FLOAT, allowNull: true}, //a measured in rae
  retinol: {type: Sequelize.FLOAT, allowNull: true},
  alphaCarot: {type: Sequelize.FLOAT, allowNull: true},
  betaCarot: {type: Sequelize.FLOAT, allowNull: true},
  betaCrypt: {type: Sequelize.FLOAT, allowNull: true},
  lycopene: {type: Sequelize.FLOAT, allowNull: true},
  luteinZeazanthin: {type: Sequelize.FLOAT, allowNull: true}, //lutein and zeazanthin combined into 1
  vitaminE: {type: Sequelize.FLOAT, allowNull: true},
  vitaminDMCG: {type: Sequelize.FLOAT, allowNull: true},
  vitaminDIU: {type: Sequelize.FLOAT, allowNull: true},
  vitaminK: {type: Sequelize.FLOAT, allowNull: true},
  saturatedFat: {type: Sequelize.FLOAT, allowNull: true},
  monosaturatedFat: {type: Sequelize.FLOAT, allowNull: true},
  polyunsaturatedFat: {type: Sequelize.FLOAT, allowNull: true},
  cholesterol: {type: Sequelize.FLOAT, allowNull: true},
  weight1: {type: Sequelize.FLOAT, allowNull: true},
  weight1Description: {type: Sequelize.STRING, allowNull:true},
  weight2: {type: Sequelize.FLOAT, allowNull: true},
  weight2Description: {type: Sequelize.STRING, allowNull:true},
  refusePercent: {type: Sequelize.FLOAT, allowNull: true}
});

module.exports = RecipeTotalNutritionModel;
