const { Router } = require("express");
const { userRegister, getAllUser } = require('../controllers')


const router = Router();

router.post('/user', userRegister);


module.exports = router;