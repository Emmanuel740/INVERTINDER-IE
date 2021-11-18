'use strict';
//Modules
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

// Json to create a document for the database in mongoose
const InversionSchema = new mongoose.Schema({

    cantidad: {
        type: String,
        required: [true, 'El nombre del provedor es requerido'],
        maxlength: [50, "El nombre de producto es muy largo"],
        trim: true,
    },
    rendimiento: {
        type: String,
        required: [true, 'El nombre del provedor es requerido'],
        maxlength: [50, "El nombre de producto es muy largo"],
        trim: true,
    },
    pagoCompletado: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    registerUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});
InversionSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});
const Inversion = mongoose.model('Inversion', InversionSchema);
module.exports = Inversion;