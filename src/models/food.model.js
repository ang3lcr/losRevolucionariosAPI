const db = require("../utils/database");
const { DataTypes } = require("sequelize");



const Food = db.define(
    "food",
    {
        id: { 
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foodCategory: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "food_category"
        },
    }
)


module.exports = Food;