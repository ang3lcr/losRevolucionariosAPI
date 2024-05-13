const { Categories } = require("../models");

class CategoriesServices {
    static async create(newCategory) {
        try {
            const result = await Categories.create(newCategory);
            // const result = newCategory
            return result
        } catch (error) {
            throw error;
        }
    }

    static async getAll(){
        try {
          const result = await Categories.findAll();
          return result
        } catch (error) {
            throw error;
        }
    }

}


module.exports = CategoriesServices