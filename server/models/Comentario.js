'use strict';
//Modules
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

// Json to create a document for the database in mongoose
const ComentarioSchema = new mongoose.Schema(
    {
        comentario: {
            type: String,
            required: [true, 'El comentario es requerido'],
        },
        fecha: {
            type: Date,
            required: [true, 'La fecha es requerido'],
           
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: [true, 'El usuario quien registra es requerido'],
        }
    },
    {
        collection: "Comentario",
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);
ComentarioSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});
const Comentario = mongoose.model('Comentario', ComentarioSchema);
module.exports = Comentario;




