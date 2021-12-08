'use strict';
//Modules and files
const {check} = require('express-validator');
const {validationJWT} = require('../middlewares/validateJWT');
const router = require('express').Router();
const {crearInversion, getInversiones, deleteInversiones,postComentario, getInversion, aceptarInversion } = require("../controllers/inversion");
const{fieldValidation} = require('../middlewares/fields-validation');


//POST project with middlewares
router.post('/crear-inversion', [
    check('investorUser','El usuario son obligatorios').not().isEmpty(),
    check('proyecto','El proyecto es obligatorio').not().isEmpty(),
    check('comentario','El comentario es obligatorio').not().isEmpty(),
    check('ofrece','La cantidad ofrecida es obligatoria').not().isEmpty(),

    fieldValidation
  ]

  ,crearInversion ,async(req, res)=>{});
router.post('/comentar', [
    check('comentario','El comentario son obligatorios').not().isEmpty(),
    check('id','El id es obligatorio').not().isEmpty(),
    fieldValidation
  ]
  ,postComentario ,async(req, res)=>{});
router.post('/accept-invest', [
    check('idInv','El comentario son obligatorios').not().isEmpty(),
    check('idProyecto','El id es obligatorio').not().isEmpty(),
    check('comentario','El comentario es obligatorio').not().isEmpty(),
    fieldValidation
  ]
,aceptarInversion ,async(req, res)=>{});
router.get('/get-investments', getInversiones);
router.delete('/investments', deleteInversiones);
router.get('/get-investment', getInversion);

// router.get('/get-projects-kind',getProyectosTipo);
// router.get('/get-my-projects',getMisProyectos);


  module.exports = router;