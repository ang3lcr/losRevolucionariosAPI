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



const deleteFood = async (req, res, next) => {
        const {id} = req.body
        const food = await FoodServices.getById(id)
        await food.destroy()
        res.status(200).json({
            "message": "Food deleted succesfully..."
        })
}



const editFood = async (req, res, next) => {
    const {id, ingredients, foodCategory, name} = req.body
    const currentFood = await FoodServices.getById(id)
    
    if(name){
        currentFood.name = name
    }else{
        currentFood.name = currentFood.name
    }

    if(ingredients){
        currentFood.ingredients = ingredients        
    }else{
        currentFood.ingredients = currentFood.ingredients        
    }

    if(foodCategory){
        currentFood.foodCategory = foodCategory
    }else{
        currentFood.foodCategory = currentFood.foodCategory
    }
    currentFood.save()
    res.status(200).json(currentFood)
}


module.exports = {
    foodRegister,
    getAllFood,
    deleteFood,
    editFood
}