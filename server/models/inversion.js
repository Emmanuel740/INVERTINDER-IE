'use strict';
//Modules
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

// Json to create a document for the database in mongoose
const InversionSchema = new mongoose.Schema({

    pagoCompletado: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'solicitud'
    },
    // investorUser: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Usuario"
    // },
    investorUser:{
       type: Object,
       required: [true,'El usuario es requerido']
    },
    registroUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, 'El usuario quien registra es requerido'],
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto"
    },
    comentarios:[{
        type: Object,
        required: [true,'Ingresa un comentario']
    }],
    ofrece:{
        type: Number,
        default: 0
    }
});
InversionSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});
const Inversion = mongoose.model('Inversion', InversionSchema);
module.exports = Inversion;