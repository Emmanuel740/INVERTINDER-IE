'use strict';
//Modules
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

// Json to create a document for the database in mongoose
const DocumentoUsuarioSchema = new mongoose.Schema(
    {
        tipoIdentificacion: {
            type: String,
            required: [true, 'La INE es requerida'],

        },
        imgidentificacion: {
            type: String,
            required: [true, 'La imagen de indetifiacion es requerida'],

        },
        comprobanteDomicilio: {
            type: String,
            required: [true, 'IMAGEN Comprobante de domicilio es requerido'],
        },
        rfc: {
            type: String,
            required: [true, 'Comprobante de domicilio es requerido'],
        },
        perteneceUsuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        },
        fechaRegDoc: {
            type: Date,
            default: Date.now
        },

    },
    {
        collection: "DocumentoUsuario",
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);
DocumentoUsuarioSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});
const DocumentoUsuario = mongoose.model('DocumentoUsuario', DocumentoUsuarioSchema);
module.exports = DocumentoUsuario;




