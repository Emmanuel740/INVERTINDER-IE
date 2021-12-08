'use strict';
//Modules and files
const {check} = require('express-validator');
const {validationJWT} = require('../middlewares/validateJWT');
const router = require('express').Router();
const {crearProyecto, getProyectos, getMisProyectos, getProyectosTipo, deleteProyecto} = require("../controllers/proyecto");
const{fieldValidation} = require('../middlewares/fields-validation');


//POST project with middlewares
router.post('/crear-proyecto', [
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    check('propuesta','La propuesta son obligatorios').not().isEmpty(),
    check('presupuesto','El presupuesto son obligatorios').not().isEmpty(),
    check('recaudado','El recaudado es obligatorio').not().isEmpty(),
    check('tipo','El tipo es obligatorio').not().isEmpty(),
    check('registroUsuario','El Usuario es obligatorio').not().isEmpty(),
    fieldValidation
  ]
  ,crearProyecto ,async(req, res)=>{});
router.get('/get-projects',getProyectos);
router.get('/get-projects-kind',getProyectosTipo);
router.get('/get-my-projects',getMisProyectos);
router.delete('/projects', deleteProyecto);


  module.exports = router;