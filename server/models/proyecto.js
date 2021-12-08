'use strict';
//Modules
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

// Json to create a document for the database in mongoose
const ProyectoSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: [true, 'El titulo del proyecto es requerido'],
            unique:[true,'El titulo del proyecto ya existe']
        },
        propuesta: {
            type: String,
            required: [true, 'La propuesta es requerida'],
        },
        presupuesto: {
            type: Number,
            required: [true, 'El presupuesto es requerida'],
        },
        recaudado: {
            type: Number,
            required: [true, 'La cantidad de recauidada es requerida'],
        },
        tipo: {
            type: String,
            required: [true, 'Tipo de proyecto '],
        },
        registroUsuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: [true, 'El usuario quien registra es requerido'],
        },
        tieneInversionista:{
            type: Boolean,
            default: false, 
        },
        tieneArchivos:{
            type: Boolean,
            default: false,
        },
        vistaPrevia:{
            type: String,
            required:[false]
        },
        inversion:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Inversion"
        }],
        // inversionistas:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Inversionista"
        // },
        // archivosProyecto:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "DocumentoProyecto"
        // },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        collection: "Proyecto",
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);
ProyectoSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});
const Proyecto = mongoose.model('Proyecto', ProyectoSchema);
module.exports = Proyecto;




