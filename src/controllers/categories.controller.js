const {CategoriesServices} = require('../services');
const { configDotenv } = require("dotenv");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require('crypto')
const sharp = require('sharp')
require("dotenv").config();


const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
})


const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const categoryRegister = async (req, res, next) => {
    try {
            const params = {
                Bucket: bucketName,
                Key: randomImageName(),
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            }
            
            const command = new PutObjectCommand(params)
            await s3.send(command)   

        //Esta respuesta ya funciona
        // const newCategory = req.body;
        const newCategory = {
            "category": req.body.category,
            "image": params.Key || null
        }
        const result = await CategoriesServices.create(newCategory);
        res.status(201).json(result)


    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'insuficient data',
        })
    }
}

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoriesServices.getAll();
        res.json(categories);
        console.log("response done")
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'Something got wrong :(',
        })
    }
}


module.exports = {
    categoryRegister,
    getAllCategories,
}