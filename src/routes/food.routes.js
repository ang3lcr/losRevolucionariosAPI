const { Router } = require("express");
const { foodRegister, getAllFood } = require('../controllers')

const router = Router();

router.post('/food', foodRegister);
router.get('/food', getAllFood)


module.exports = router;