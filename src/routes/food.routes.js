const { Router } = require("express");
const { foodRegister, getAllFood, deleteFood, editFood } = require('../controllers')

const router = Router();

router.post('/food', foodRegister);
router.get('/food', getAllFood);
router.delete('/food', deleteFood)
router.put('/food', editFood)


module.exports = router;