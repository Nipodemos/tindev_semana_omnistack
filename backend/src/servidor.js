const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rotas = require('./rotas');


const app = express();
const servidor = require('http').Server(app);
const io = require('socket.io')(servidor);

const usuariosConectados = {};

io.on('connection', (socket) => {
    const { user } = socket.handshake.query;

    console.log(user, socket.id)
})

mongoose.connect('mongodb+srv://nipodemos:nipodemos@cluster0-iibi7.mongodb.net/omnistack8?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use((req, res, next) => {
    req.io = io;
    req.usuariosConectados = usuariosConectados;

    return next();
})
app.use(cors());
app.use(express.json());
app.use(rotas);


servidor.listen(3333);