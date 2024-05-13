const {userRegister, getAllUser} = require("./user.controller")
const {foodRegister, getAllFood} = require("./food.controller")
const {categoryRegister, getAllCategories} = require("./categories.controller")




module.exports = {
    userRegister,
    getAllUser,
    foodRegister,
    getAllFood,
    categoryRegister,
    getAllCategories
}