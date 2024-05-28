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

    static async getById(id){
        try {
           const category = await Categories.findByPk(id)
           return category
        } catch (error) {
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const updatedCategory = await Categories.update({category: data.category}, {
                where: {
                    id: id
                }
            });
            return updatedCategory;
        } catch (error) {
            console.error(`Error updating category with id ${id}:`, error);
            throw new Error('Unable to update category.'); // Propaga el error hacia arriba para que el llamador pueda manejarlo.
        }
    }
    



}


module.exports = CategoriesServices