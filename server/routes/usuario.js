'use strict';
//Modules and files
const {check} = require('express-validator');
const {validationJWT} = require('../middlewares/validateJWT');
const router = require('express').Router();
const {crearUsuario,getUsuarios,editarUsuario,eliminarUsuario} = require("../controllers/usuario");
const{fieldValidation} = require('../middlewares/fields-validation');


//POST user with middlewares
router.post('/crear-usuario', [
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('apellidos','Los apellidos son obligatorios').not().isEmpty(),
  check('user','Los apellidos son obligatorios').not().isEmpty(),
  check('email','El correo es obligatorio').not().isEmpty(),
  check('password','El password es obligatorio').not().isEmpty(),
  check('password2','La confirmacion del password es obligatorio').not().isEmpty(),
  fieldValidation
]
,crearUsuario ,async(req, res)=>{});
//GET users with middlewares
router.get('/get-users',getUsuarios);

//PUT user with middlewares
router.put('/editar-usuario',
[
  check('id','El id es obligatorio').not().isEmpty(),
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('user','El user es obligatorio').not().isEmpty(),
  check('apellidos','Los apellidos son obligatorios').not().isEmpty(),
  check('email','El email es obligatorio').not().isEmpty(),
  check('telefono','El telefono es obligatorio').not().isEmpty(),

  fieldValidation
],
editarUsuario
);

//DELETE USER with middlewares
router.delete('/eliminar-user/:id',
validationJWT,
eliminarUsuario
);


module.exports = router;