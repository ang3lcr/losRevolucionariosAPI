const db = require("../utils/database")
const { DataTypes } = require("sequelize")

const Categories = db.define(
    "categories",
    {
        id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        category:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        image:{
          type: DataTypes.TEXT('long'),
          allowNull: true,
        }
    }
)


module.exports = Categories;