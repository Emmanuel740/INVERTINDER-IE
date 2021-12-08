'use strict';
//Modules
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

// Json to create a document for the database in mongoose
const UsuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es requerido'],
        },
        apellidos: {
            type: String,
            required: [true, 'El Usuario es requerido'],
           
        },
        user: {
            type: String,
            required: [true, 'El Usuario es requerido'],
            unique: [true, 'El usuario ya existe']
        },
        email: {
            type: String,
            required: [true, 'El correo es requerido'],
        },
        telefono: {
            type: Number,
            required: [true, 'El telefono es requerido'],
        },
        password: {
            type: String,
            required: [true, 'El password es requerido'],
        },
        img: {
            type: String
        },
        status: {
            type: Boolean,
            default: true,
        },
        cuentaBanco:{
            type: String
        },
        documentosUsuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DocumentoUsuario"
        },
        tipo:{
            type: String,
            required: [true, 'El tipo de usuario es requerido'],

        },
        // documentosInversion: {
        //     type: Schema.Types.ObjectId,
        //     ref: "DocumentoInversion"
        // },
        fechaRegUsuario: {
            type: Date,
            default: Date.now
        },
    },
    {
        collection: "Usuario",
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);
UsuarioSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});
const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;




