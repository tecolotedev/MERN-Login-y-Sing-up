const express = require('express');
const app = express();

app.use(require('./usuarios.js'));

module.exports = app;