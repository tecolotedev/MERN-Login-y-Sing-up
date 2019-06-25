const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es requerido']
    },
    apellido:{
        type:String,
        required:[true,'El apellido es requerido']
    },
    contraseña:{
        type:String,
        required:[true,'La contraseña  es requerida']
    },
    correo:{
        type:String,
        required:[true,'El correo es requerido'],
        unique:true
    }
});

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});


module.exports = mongoose.model('Usuario', usuarioSchema);