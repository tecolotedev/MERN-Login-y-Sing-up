const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



app.use(require('./Routes/index_rutas.js'));

//Servir la aplicacion de React
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


mongoose.connect('mongodb://localhost:27017/red-social', {useNewUrlParser: true},(err,res)=>{
    if(err){
        console.log(err);
        return 
    } 
    console.log('Base de datos online');
    
});

app.listen(5000,()=>{
    console.log('Escuchando en puerto 5000')
})