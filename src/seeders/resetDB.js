const db = require("../utils/database")
const initModels = require("../models/initModels")


initModels();

db.authenticate()
    .then(() => console.log("Autenticacion exitosa..."))
    .catch((error) => console.log(error));

db.sync({force:true})
    .then(() => console.log("Database reset..."))
    .catch((error) => console.log(error));