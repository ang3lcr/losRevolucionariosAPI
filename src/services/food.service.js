
const { Food } = require("../models");

class FoodServices {
    static async create(newFood) {
        try {
            // const result = await Food.create(newFood);
            const result = newFood
            return result
        } catch (error) {
            throw error;
        }
    }

    static async getAll(){
        try {
            const result = await Food.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = FoodServices;