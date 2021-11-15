'use strict';
//Modules
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

// Json to create a document for the database in mongoose
const DocumentoProyectoSchema = new mongoose.Schema(
    {
        planNegocio: {
            type: String,
            required: [true, 'El archivo plan de negocios  es requerido'],

        },
        documentacion: {
            type: String,
            required: [true, 'La documentacion del proyecto es requerida'],

        },
       modeloCavas: {
            type: String,
            required: [true, 'Comprobante de domicilio es requerido'],
        },
        finanzas: {
            type: String,
        },
        perteneceProyecto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Proyecto"
        },
        fechaRegDoc: {
            type: Date,
            default: Date.now
        },

    },
    {
        collection: "DocumentoProyecto",
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);
DocumentoProyectoSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});
const DocumentoProyecto = mongoose.model('DocumentoProyecto', DocumentoProyectoSchema);
module.exports = DocumentoProyecto;




