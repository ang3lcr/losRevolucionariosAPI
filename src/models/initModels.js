const { User, Food, Categories } = require("./index");

const initModels = () => {
    Food.belongsTo(Categories, { foreignKey: 'food_category', as: 'categorie' });
};

module.exports = initModels;