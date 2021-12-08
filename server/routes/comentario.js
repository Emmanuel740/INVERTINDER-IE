'use strict';
//Modules and files
const {check} = require('express-validator');
const {validationJWT} = require('../middlewares/validateJWT');
const router = require('express').Router();
const {crearComentario,getComentarios} = require("../controllers/Comentario");
const{fieldValidation} = require('../middlewares/fields-validation');


//POST user with middlewares
router.post('/crear-comentario', [
  check('user','El user es obligatorio').not().isEmpty(),
  check('fecha','La fecha son obligatorios').not().isEmpty(),
  check('comentario','El comentarioson obligatorios').not().isEmpty(),

  fieldValidation
]
,crearComentario ,async(req, res)=>{});
//GET users with middlewares
router.get('/get-comentarios',getComentarios);



module.exports = router;