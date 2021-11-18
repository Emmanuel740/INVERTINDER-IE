'use strict';
//Modules and files
const {check} = require('express-validator');
const {validationJWT} = require('../middlewares/validateJWT');
const router = require('express').Router();
const {getDocUsuario,uploadDocUsuario,deleteDocUsuario} = require("../controllers/docUsuario");
const{fieldValidation} = require('../middlewares/fields-validation');


//POST user with middlewares
router.post('/doc-usuario', [
  check('tipoIdentificacion','El tipo de identificacion no es requerida').not().isEmpty(),
  check('imgidentificacion','La imagen de identificacion es requerida').not().isEmpty(),
  check('comprobanteDomicilio','Los apellidos son obligatorios').not().isEmpty(),
  check('rfc','El RFC es requerido').not().isEmpty(),
  fieldValidation
]
,uploadDocUsuario ,async(req, res)=>{});


router.get('/doc-usuario',validationJWT,getDocUsuario);

// //PUT user with middlewares
// router.put('/editar-usuario/:id',
// [
//   validationJWT,
//   check('nombre','El nombre es obligatorio').not().isEmpty(),
//   check('user','El user es obligatorio').not().isEmpty(),
//   check('apellidos','Los apellidos son obligatorios').not().isEmpty(),
//   check('email','El email es obligatorio').not().isEmpty(),
//   check('telefono','El telefono es obligatorio').not().isEmpty(),

//   fieldValidation
// ],
// editarUsuario
// );

//DELETE USER with middlewares
router.delete('/eliminarDocUser/:id',
validationJWT,
deleteDocUsuario
);


module.exports = router;