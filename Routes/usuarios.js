const express= require('express');
const app = express();
const Usuario = require('../models/usuarios');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/registro',(req,res)=>{
    let body = req.body;
    console.log(body)
    let usuario = new Usuario({
        nombre: body.nombre,
        contraseña: bcrypt.hashSync(body.password, 10),
        correo: body.correo,
        apellido:body.apellido
    });

    usuario.save((err,usuarioDB)=>{
        if(err){
            console.log(err);
            
            res.json({
                ok:false,
                mensaje:'El correo debe ser unico'
            })
            return
            
        }
        res.json({
            ok:true,
            mensaje:'Todo perfecto',
            usuarioDB
        })
    })
});

app.put('/login',(req,res)=>{
    const body = req.body;
    Usuario.findOne({correo:body.correo},(err,usuarioDB)=>{
        if(err){
            return(
                res.json({
                    ok:false,
                    mensaje:'ocurrio un error en el servidor'
                })
            )
        }
        if(!usuarioDB){
            return(res.json({
                ok:false,
                mensaje:'Correo invalido'
            })
            )
        }
        if(!bcrypt.compareSync(body.pass,usuarioDB.contraseña)){
            return(
                res.json({
                    ok:false,
                    mensaje:'Contraseña Invalida'
                })
            )
        }

        let token = jwt.sign({
            usuario:usuarioDB
        },'semilla',{expiresIn:'48h'})

        res.json({
            ok:true,
            usuario:usuarioDB,
            token
        })

    })
    
})

module.exports = app;