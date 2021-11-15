'use strict';
//Modules and files
const {check} = require('express-validator');
const {validationJWT} = require('../middlewares/validateJWT');
const router = require('express').Router();
const {getInversionistas,crearInversionista,deleteInversionista} = require("../controllers/inversionista");
const{fieldValidation} = require('../middlewares/fields-validation');

//POST user with middlewares
router.post('/new-inversionista', 
[
    
    check('registroUsuario','El id de quien registro es obligatorio').not().isEmpty(),
    check('cantInvertir','La cantidad a invertir es obligatoria').not().isEmpty(),
    check('rendimiento','El rendimiento es obligatorio').not().isEmpty(),
    check('tipoProyecto','El tipo de proyecto es obligatorio').not().isEmpty(),
    check('proyectos','El id del proyecto es obligatorio').not().isEmpty(),
    fieldValidation
    
]
, crearInversionista ,async (req, res) => {
   
});

//GET 
router.get('/inversionistas',getInversionistas);


//DELETE 
router.delete('/eliminarInversionista/:id',
deleteInversionista
);


module.exports = router;