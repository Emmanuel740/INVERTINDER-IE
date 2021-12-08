'use strict';
//Modules
const express = require('express');
const app = express();

//Index of all routes
app.use('/api/usuarios',require("./usuario"));
app.use('/api/inversionista',require("./inversionista"));
app.use('/api/usuarios',require("./docUsuario"));
app.use('/api/proyectos',require("./proyecto"));
app.use('/api/inversiones',require("./inversion"));
app.use('/api/comentarios',require("./comentario"));

// app.use('/api/provider',require("./provider"));
// app.use('/api/search',require("./search"));
app.use('/api/login',require("./auth"));
// app.use('/api/upload',require("./upload"));

module.exports = app;