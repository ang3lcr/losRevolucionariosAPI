const express = require("express");
const morgan = require("morgan");
const cors = require ("cors");
const db = require("./utils/database");
const initModels = require("./models/initModels");
const { userRoutes, foodRoutes, categoriesRoutes } = require("./routes");
const multer = require("multer");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const app = express();



app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


initModels();



db.authenticate()
    .then(() => console.log("Succesfully authenticated"))
    .catch((error) => console.log(error));

db.sync({force:false})
    .then(() => console.log("Database sync"))
    .catch((error) => console.log(error));


app.get('/', (req, res) => {
    console.log("App running...");
});


app.use('/api/v1', userRoutes);
app.use('/api/v1', foodRoutes);
app.use('/api/v1', categoriesRoutes);




module.exports = app
