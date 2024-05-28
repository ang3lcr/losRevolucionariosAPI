const {CategoriesServices} = require('../services');
const { configDotenv } = require("dotenv");
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
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
        let categories = await CategoriesServices.getAll();
        categories = JSON.parse(JSON.stringify(categories));
        for (const category of categories){
            const getObjectParams = {
                Bucket: bucketName,
                Key: category.image,
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            category.imageUrl = url;
        }
        res.json(categories);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'Something went wrong :(',
        });
    }
}

const editCategory = async (req, res, next) => {
    try {
            const {id, category} = req.body

            const currentCategory = await CategoriesServices.getById(id)
            currentCategory.category = category
            currentCategory.save()
            res.status(200).json(currentCategory)
        // const { id } = req.params;
        // const { category } = req.body;
        // let imageKey;

        // // Check if a new file is uploaded
        // if (req.file) {
        //     // Generate new image key
        //     imageKey = randomImageName();
            
        //     // Upload new image to S3
        //     const uploadParams = {
        //         Bucket: bucketName,
        //         Key: imageKey,
        //         Body: req.file.buffer,
        //         ContentType: req.file.mimetype,
        //     };
        //     const uploadCommand = new PutObjectCommand(uploadParams);
        //     await s3.send(uploadCommand);

        //     // Get existing category to delete the old image
        //     const existingCategory = await CategoriesServices.getById(id);
        //     if (existingCategory.image) {
        //         // Delete old image from S3
        //         const deleteParams = {
        //             Bucket: bucketName,
        //             Key: existingCategory.image,
        //         };
        //         const deleteCommand = new DeleteObjectCommand(deleteParams);
        //         await s3.send(deleteCommand);
        //     }
        // }

        // // Update category details
        // const updatedCategory = {
        //     category: category,
        //     image: imageKey || req.body.image // Use new image key if a new file is uploaded
        // };

        // const result = await CategoriesServices.update(id, updatedCategory);
        




        
        // // Retrieve signed URL for the updated image
        // if (result.image) {
        //     const getObjectParams = {
        //         Bucket: bucketName,
        //         Key: result.image,
        //     };
        //     const command = new GetObjectCommand(getObjectParams);
        //     const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        //     result.imageUrl = url;
        // }

    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'Failed to update category',
        });
    }
};


module.exports = {
    categoryRegister,
    getAllCategories,
    editCategory
}