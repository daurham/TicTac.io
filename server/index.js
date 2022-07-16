const express = require('express');
const path = require('path');

const deployedIP = '';
const clients = require('./clients.js');


const app = express();
const PORT = process.env.USER_PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));

//* Local 
const server = app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`));
//*/

/* Deployed
app.listen(PORT, () => console.log(`Listening to http://${deployedIP}:${PORT}`));
const server = require('http').createServer(app);
// */
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  },
});

io.on('connection', (socket) => {
  console.log('client connected');
  console.log('Current turn: ', clients.turn);
  console.log(clients);

  socket.on('connect', () => { 
  });


  socket.on('addPlayer1', (name) => {
    console.log(name, 'is joining as player1');
    clients.reassign('player1', socket.id, name, 'player1');
    io.emit('addPlayer1', clients.getPlayers());
  });

  socket.on('addPlayer2', (name) => {
    console.log(name, 'is joining as player2');
    clients.reassign('player2', socket.id, name, 'player2');
    io.emit('addPlayer2', clients.getPlayers());
  });

  socket.on('message', (message) => {
    let curUser = clients.getName(socket.id);
    io.emit('message', `${curUser}: ${message}`);
  });

  socket.on('move', (move) => {
    io.emit('move', move);
    let curUser = clients.getName(socket.id);
    io.emit('announcer', `${curUser} made a move!`);
  });

  socket.on('disconnecting', () => {
  });

  socket.on('disconnect', () => {
    let curUser = clients.getName(socket.id);
    if (curUser !== 'Audience') {
      clients.reassign(curUser, null, null, null);
    }
    clients.reassign(socket.id, socket.id, curUser, null);
    console.log(`${curUser} has disconnected`);
    io.emit('disconnectPlayer', curUser);
  });


  socket.on('wipe', (freshBoard) => {
    io.emit('wipe', freshBoard);
  });

  socket.on('resetBoard', (win) => {
    io.emit('resetBoard', win);
  });

  socket.on('getTurn', () => {
    io.emit('getTurn', clients.turn);
  });

  socket.on('toggleTurn', () => {
    io.emit('toggleTurn', clients.toggleTurn());
  });



  socket.on('reload', () => {
  });

});
