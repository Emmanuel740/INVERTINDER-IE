'use strict';
//Modules
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

// Json to create a document for the database in mongoose
const InversionistaSchema = new mongoose.Schema({

   
    registroUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",

    },

    cantInvertir: {
        type: Number,
        min: [0, "No puede haber numeros negativos"],
        required:true
    },
    rendimiento: {
        type: Number,
        min: [0, "No puede haber numeros negativos"],
        required:true
    },
    tipoProyecto:{
        type:String,
        required:true
    },
    proyectos:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto",
    },
    documentosInversionista:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DocumentoInversionista",
    }
}, {
    collection: "Inversionista",
    timestamps: {
        createdAt: "created_at",
    },
});
InversionistaSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});
const Inversionista = mongoose.model('Inversionista', InversionistaSchema);
module.exports = Inversionista;