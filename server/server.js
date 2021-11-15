'use strict';
//Modules and files
require("dotenv").config();

const express = require("express");

const connectionDB = require("./config/db");
const { PORT } = require("./config/config");

//Servidor

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Configuracion del CORS

app.use(express.json());

//Index of routes
app.use(require("./routes/index"));


// Conexion de DB 
if (process.env.DEVELOPMENT) {
    connectionDB.conenctToLocalDB();
   }else{
     connectionDB.connectToAtlas();
   }
   

app.listen(PORT, function() {
    console.log(`Listening to port: http://localhost:${PORT}`);
});
