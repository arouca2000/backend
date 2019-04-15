const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-yvqzz.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
});

// // middleware => interceptador
// //get cria uma rota onde o usuário poderá digitar na url
// app.get('/teste', (req, res) => {
//     return res.send('Hello World!');
// })

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json());  // permite trabalhar com requisições no formato json
app.use(express.urlencoded({ extended: true }));  // permite enviar arquivos nas nossas requisições
app.use('/files', express.static(path.resolve(__dirname,'..','tmp')));

app.use(require('./routes'));

// app.listen(3333);
server.listen(3333);  // ouve tanto requisições http como websocket


