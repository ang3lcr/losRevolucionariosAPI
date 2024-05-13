const { Router } = require("express");
const { categoryRegister, getAllCategories } = require('../controllers')
const multer = require("multer");

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

upload.single('image')

const router = Router();

router.post('/categories', upload.single('image'), categoryRegister);
router.get('/categories', getAllCategories)


module.exports = router;