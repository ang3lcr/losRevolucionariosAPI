const {FoodServices} = require('../services');
const { configDotenv } = require("dotenv");
require("dotenv").config();


const foodRegister = async (req, res, next) => {
    try {
        const newFood = req.body;
        const result = await FoodServices.create(newFood);
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'insuficient data',
        })
    }
}


const getAllFood = async (req, res, next) => {
    try {
        const food = await FoodServices.getAll();
        res.json(food);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'Something got wrong :(',
        })
    }
}


module.exports = {
    foodRegister,
    getAllFood,
}