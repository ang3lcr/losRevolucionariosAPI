const {userRegister, getAllUser} = require("./user.controller")
const {foodRegister, getAllFood} = require("./food.controller")
const {categoryRegister, getAllCategories, editCategory, deleteCategory} = require("./categories.controller")
const {userLogin} = require("./auth.controller")




module.exports = {
    userRegister,
    getAllUser,
    foodRegister,
    getAllFood,
    categoryRegister,
    getAllCategories,
    editCategory,
    deleteCategory,
    userLogin
}