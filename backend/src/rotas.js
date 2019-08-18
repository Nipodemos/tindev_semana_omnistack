const express = require('express');
const rotas = express.Router();
const ControladorDev = require('./controladores/ControladorDev');
const ControladorLike = require('./controladores/ControladorLike');
const ControladorDislike = require('./controladores/ControladorDislike');

rotas.get('/devs', ControladorDev.index)

rotas.post('/devs', ControladorDev.store);
rotas.post('/devs/:devId/likes', ControladorLike.store);
rotas.post('/devs/:devId/dislikes', ControladorDislike.store);

module.exports = rotas;