'use strict';
//Modules and files
require("dotenv").config();
const cors = require('cors')
const express = require("express");
const connectionDB = require("./config/db");
const { PORT } = require("./config/config");

//Servidor

const app = express();
app.use(express.urlencoded({limit: '50mb', extended: false }));
app.use(express.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: false })); //url amistosa, captura los datos del formulario
//Parse de formato a application/json
//app.use(bodyParser.json({limit: '50mb'}));
//Configuracion del CORS
app.use(cors())
 
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
